---
title: RAG Chunking Strategies That Actually Work in Production
date: 2025-01-28
tags: [AI, RAG, Python]
excerpt: After testing eight chunking approaches on five different corpus types, here's what I've learned about the tradeoffs — and when each strategy breaks down.
---

# RAG Chunking Strategies That Actually Work in Production

Chunking is the unsexy part of RAG that determines whether your retrieval system is good or embarrassing. Fixed-size chunking ships fast and fails quietly. Here's a practical guide to what actually works.

## Why chunking matters more than you think

Your embedding model encodes chunks into fixed-size vectors. Too large, and the embedding becomes a blurry average that retrieves nothing well. Too small, and you lose context that makes retrieved passages interpretable.

The chunk size problem is fundamentally different for different corpus types:

- **Dense technical docs**: Small chunks, heavy overlap
- **Long-form narrative**: Paragraph or section boundaries
- **Structured data (tables, code)**: Preserve the semantic unit entirely

## Strategy 1: Recursive character splitting

The default approach. Split on paragraph breaks, then sentence breaks, then character count. Works for most unstructured prose.

```python
from langchain.text_splitter import RecursiveCharacterTextSplitter

splitter = RecursiveCharacterTextSplitter(
    chunk_size=512,
    chunk_overlap=64,
    separators=["\n\n", "\n", ". ", " ", ""]
)
```

Good enough for 80% of cases. Falls apart on code-heavy documentation.

## Strategy 2: Semantic boundary splitting

Use an embedding model to detect where meaning shifts in the text. Compute cosine similarity between adjacent sentence embeddings; large drops signal a topic boundary.

This is slower but produces dramatically better chunks for mixed-content documents like technical blog posts or research papers.

## Strategy 3: Structural parsing

For anything with inherent structure — markdown, HTML, code files — parse the structure and use it directly. A markdown file with headings should chunk at headings. A Python file should chunk at function or class boundaries.

```python
import ast

def chunk_python_file(source: str) -> list[str]:
    tree = ast.parse(source)
    chunks = []
    for node in ast.walk(tree):
        if isinstance(node, (ast.FunctionDef, ast.ClassDef)):
            chunks.append(ast.get_source_segment(source, node))
    return chunks
```

## The hybrid approach

In ContextForge, I ended up with a classifier that detects document type and routes to the appropriate strategy. It's more infrastructure but the retrieval quality improvement is significant — around 18% increase in answer faithfulness on our eval set.
