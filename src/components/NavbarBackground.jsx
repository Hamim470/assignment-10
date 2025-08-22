import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";

const NavbarBackground = () => (
  <Canvas className="absolute top-0 left-0 w-full h-full -z-10">
    <ambientLight intensity={0.5} />
    <directionalLight position={[0, 0, 5]} />
    <Stars radius={100} depth={50} count={3000} factor={4} fade />
    <OrbitControls enableZoom={false} autoRotate />
  </Canvas>
);
export default NavbarBackground;
