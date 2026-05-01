// import { useEffect, useRef } from 'react'
// import * as THREE from 'three'

// const HOTSPOTS = [
//   [40.7,-74],[51.5,-0.1],[35.7,139.7],[37.8,-122.4],[48.9,2.3],
//   [55.7,37.6],[1.3,103.8],[-33.9,151.2],[19.4,-99.1],[-23.5,-46.6],
//   [28.6,77.2],[31.2,121.5],[52.5,13.4],[25.2,55.3],[-26.2,28.0],
// ]

// function latLonToVec3(lat, lon, r) {
//   const phi = (90 - lat) * (Math.PI / 180)
//   const theta = (lon + 180) * (Math.PI / 180)
//   return new THREE.Vector3(
//     -r * Math.sin(phi) * Math.cos(theta),
//      r * Math.cos(phi),
//      r * Math.sin(phi) * Math.sin(theta)
//   )
// }

// export default function Globe() {
//   const canvasRef = useRef(null)

//   useEffect(() => {
//     const canvas = canvasRef.current
//     const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true })
//     renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
//     renderer.setSize(canvas.clientWidth, canvas.clientHeight)
//     renderer.setClearColor(0x000000, 0)

//     const scene = new THREE.Scene()
//     const camera = new THREE.PerspectiveCamera(45, canvas.clientWidth / canvas.clientHeight, 0.1, 1000)
//     camera.position.z = 2.8

//     const R = 1
//     const globe = new THREE.Mesh(
//       new THREE.SphereGeometry(R, 64, 64),
//       new THREE.MeshPhongMaterial({ color: 0x050810, emissive: 0x000510, transparent: true, opacity: 0.95 })
//     )
//     scene.add(globe)

//     // Grid lines
//     const gridGroup = new THREE.Group()
//     const lineMat = new THREE.LineBasicMaterial({ color: 0x00f5ff, transparent: true, opacity: 0.06 })
//     for (let lat = -80; lat <= 80; lat += 20) {
//       const pts = []
//       const lr = (lat * Math.PI) / 180
//       for (let lon = 0; lon <= 360; lon += 2) {
//         const lo = (lon * Math.PI) / 180
//         pts.push(new THREE.Vector3(R * Math.cos(lr) * Math.cos(lo), R * Math.sin(lr), R * Math.cos(lr) * Math.sin(lo)))
//       }
//       gridGroup.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), lineMat))
//     }
//     for (let lon = 0; lon < 360; lon += 20) {
//       const pts = []
//       const lo = (lon * Math.PI) / 180
//       for (let lat = -90; lat <= 90; lat += 2) {
//         const lr = (lat * Math.PI) / 180
//         pts.push(new THREE.Vector3(R * Math.cos(lr) * Math.cos(lo), R * Math.sin(lr), R * Math.cos(lr) * Math.sin(lo)))
//       }
//       gridGroup.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), lineMat))
//     }
//     scene.add(gridGroup)

//     // Atmosphere
//     scene.add(new THREE.Mesh(
//       new THREE.SphereGeometry(R * 1.08, 32, 32),
//       new THREE.MeshPhongMaterial({ color: 0x00f5ff, transparent: true, opacity: 0.03, side: THREE.BackSide })
//     ))

//     // Dots
//     const dotGroup = new THREE.Group()
//     scene.add(dotGroup)
//     const dotMesh = new THREE.SphereGeometry(0.008, 6, 6)
//     const dots = HOTSPOTS.map(([lat, lon]) => {
//       const mat = new THREE.MeshBasicMaterial({ color: 0x00f5ff })
//       const mesh = new THREE.Mesh(dotMesh, mat)
//       mesh.position.copy(latLonToVec3(lat, lon, R + 0.002))
//       dotGroup.add(mesh)
//       return { mesh, phase: Math.random() * Math.PI * 2 }
//     })

//     // Arcs
//     const arcGroup = new THREE.Group()
//     scene.add(arcGroup)

//     class Arc {
//       constructor(a, b) {
//         this.from = latLonToVec3(a[0], a[1], R + 0.002)
//         this.to = latLonToVec3(b[0], b[1], R + 0.002)
//         this.progress = 0
//         this.speed = 0.005 + Math.random() * 0.004
//         this.active = true
//         const mid = new THREE.Vector3().addVectors(this.from, this.to).multiplyScalar(0.5)
//         mid.normalize().multiplyScalar(R + 0.2 + Math.random() * 0.1)
//         this.pts = Array.from({ length: 61 }, (_, i) => {
//           const t = i / 60
//           return new THREE.Vector3(
//             (1-t)*(1-t)*this.from.x + 2*(1-t)*t*mid.x + t*t*this.to.x,
//             (1-t)*(1-t)*this.from.y + 2*(1-t)*t*mid.y + t*t*this.to.y,
//             (1-t)*(1-t)*this.from.z + 2*(1-t)*t*mid.z + t*t*this.to.z
//           )
//         })
//         this.geo = new THREE.BufferGeometry()
//         this.line = new THREE.Line(this.geo, new THREE.LineBasicMaterial({ color: 0x00f5ff, transparent: true, opacity: 0.75 }))
//         arcGroup.add(this.line)
//       }
//       update() {
//         this.progress = Math.min(this.progress + this.speed, 1)
//         const visible = this.pts.slice(0, Math.ceil(this.progress * this.pts.length))
//         if (visible.length >= 2) this.geo.setFromPoints(visible)
//         if (this.progress >= 1) {
//           this.active = false
//           setTimeout(() => { arcGroup.remove(this.line); this.line.geometry.dispose() }, 1000)
//         }
//       }
//     }

//     let arcs = []
//     const spawnArc = () => {
//       const a = Math.floor(Math.random() * HOTSPOTS.length)
//       let b = Math.floor(Math.random() * HOTSPOTS.length)
//       while (b === a) b = Math.floor(Math.random() * HOTSPOTS.length)
//       arcs.push(new Arc(HOTSPOTS[a], HOTSPOTS[b]))
//     }
//     spawnArc()
//     const arcInterval = setInterval(spawnArc, 1400)

//     // Lights
//     scene.add(new THREE.AmbientLight(0x111133, 2))
//     const pl = new THREE.PointLight(0x00f5ff, 1.2, 10)
//     pl.position.set(3, 2, 3)
//     scene.add(pl)
//     const pl2 = new THREE.PointLight(0x0044ff, 0.6, 10)
//     pl2.position.set(-3, -2, -2)
//     scene.add(pl2)

//     let mouseX = 0, mouseY = 0
//     const onMouseMove = (e) => {
//       mouseX = (e.clientX / window.innerWidth - 0.5) * 2
//       mouseY = (e.clientY / window.innerHeight - 0.5) * 2
//     }
//     window.addEventListener('mousemove', onMouseMove)

//     const onResize = () => {
//       renderer.setSize(canvas.clientWidth, canvas.clientHeight)
//       camera.aspect = canvas.clientWidth / canvas.clientHeight
//       camera.updateProjectionMatrix()
//     }
//     window.addEventListener('resize', onResize)

//     let t = 0, rotY = 0, rafId
//     const animate = () => {
//       rafId = requestAnimationFrame(animate)
//       t += 0.005
//       rotY += 0.002
//       const ry = rotY + mouseX * 0.15
//       const rx = mouseY * 0.1
//       ;[globe, gridGroup, dotGroup, arcGroup].forEach(obj => {
//         obj.rotation.y = ry
//         obj.rotation.x = rx
//       })
//       dots.forEach(d => {
//         const s = 1 + 0.4 * Math.sin(t * 2 + d.phase)
//         d.mesh.scale.setScalar(s)
//       })
//       arcs = arcs.filter(a => a.active)
//       arcs.forEach(a => a.update())
//       renderer.render(scene, camera)
//     }
//     animate()

//     return () => {
//       cancelAnimationFrame(rafId)
//       clearInterval(arcInterval)
//       window.removeEventListener('mousemove', onMouseMove)
//       window.removeEventListener('resize', onResize)
//       renderer.dispose()
//     }
//   }, [])

//   return (
//     <canvas
//       ref={canvasRef}
//       style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
//     />
//   )
// }
