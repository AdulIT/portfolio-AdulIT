import {useEffect} from 'react'

import * as THREE from 'three'
import gsap from 'gsap'

import './styles/App.css'
import Header from './components/Header/Header'
import About from './components/About/About'

function App() {

	useEffect(() =>
	{
        const parameters = {
            materialColor: '#ffeded'
        }

        const canvas = document.querySelector('canvas.webgl')

		const scene = new THREE.Scene()
		
        /**
         * Particles
         */
        const particlesCount = 200
        const positions = new Float32Array(particlesCount * 3)

        for (let i = 0; i < particlesCount * 3; i++)
        {
            const i3 = i * 3
            positions[i3 + 0] = (Math.random() - 0.5) * 10
            positions[i3 + 1] = (Math.random() - 0.5) * 10
            positions[i3 + 2] = (Math.random() - 0.5) * 10
        }

        const particlesGeometry = new THREE.BufferGeometry()
        
        particlesGeometry.setAttribute(
            'position',
            new THREE.BufferAttribute(positions, 3)
        )

        // Material
        const particlesMaterial = new THREE.PointsMaterial({
            color: parameters.materialColor,
            size: 0.03,
            sizeAttenuation: true
        })

        const particles = new THREE.Points(particlesGeometry, particlesMaterial)
        scene.add(particles)

        /**
         * Light
         */

        const directionalLight = new THREE.DirectionalLight('#ffffff', 1)
        directionalLight.position.set(1, 1, 0)
        scene.add(directionalLight)

        /**
         * Sizes
         */
        const sizes = {
            width: window.innerWidth,
            height: window.innerHeight
        }

        window.addEventListener('resize', () =>
        {
            // Update sizes
            sizes.width = window.innerWidth
            sizes.height = window.innerHeight

            // Update camera
            camera.aspect = sizes.width / sizes.height
            camera.updateProjectionMatrix()

            // Update renderer
            renderer.setSize(sizes.width, sizes.height)
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
        })

        /**
         * Camera
         */
        // Group
        const cameraGroup = new THREE.Group()
        scene.add(cameraGroup)

        // Base camera
        const camera = new THREE.PerspectiveCamera(35, sizes.width / sizes.height, 0.1, 100)
        camera.position.z = 6
        cameraGroup.add(camera)

        /**
         * Renderer
         */
        const renderer = new THREE.WebGLRenderer({
            canvas: canvas,
            alpha: true
        })
        renderer.setSize(sizes.width, sizes.height)
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

        /**
         * Cursor
         */
        const cursor = {}
        cursor.x = 0
        cursor.y = 0

        window.addEventListener('mousemove', (event) =>
        {
            cursor.x = event.clientX / sizes.width - 0.5
            cursor.y = event.clientY / sizes.height - 0.5
        })

        /**
         * Animate
         */
        const clock = new THREE.Clock()
        let previousTime = 0

        const tick = () =>
        {
            const elapsedTime = clock.getElapsedTime()
            const deltaTime = elapsedTime - previousTime
            previousTime = elapsedTime


            // Animate camera
            camera.position.y = - scrollY / sizes.height * 4

            const parallaxX = cursor.x * 0.5
            const parallaxY = - cursor.y * 0.5
            cameraGroup.position.x += (parallaxX - cameraGroup.position.x) * 5 * deltaTime
            cameraGroup.position.y += (parallaxY - cameraGroup.position.y) * 5 * deltaTime

            // Render
            renderer.render(scene, camera)

            // Call tick again on the next frame
            window.requestAnimationFrame(tick)
        }

        tick()
	}, [])

	return (
		<main className="App">
			<canvas className='webgl'></canvas>
			<div className="container">
				<Header />
				<About />
			</div>
		</main>
	)
}

export default App
