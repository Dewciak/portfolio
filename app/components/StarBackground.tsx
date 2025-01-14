// "use client";

// import React, {useState, useRef, Suspense} from "react";
// import {Canvas, useFrame} from "@react-three/fiber";
// import {Points, PointMaterial, Preload} from "@react-three/drei";
// // @ts-ignore
// import * as random from "maath/random/dist/maath-random.esm";

// interface StarBackgroundProps {}

// const StarBackground: React.FC<StarBackgroundProps> = (props) => {
//   const ref = useRef<any>(null);
//   const [sphere] = useState(() => random.inSphere(new Float32Array(3000), {radius: 1.2}));

//   useFrame((state, delta) => {
//     if (ref.current) {
//       ref.current.rotation.x -= delta / 11;
//       ref.current.rotation.y -= delta / 25;
//     }
//   });

//   return <></>;
// };

// const StarsCanvas = () => (
//   <div className='w-full h-auto fixed inset-0 -z-10'>
//     <Canvas camera={{position: [0, 0, 1]}}>
//       <Suspense fallback={null}>
//         <StarBackground />
//       </Suspense>
//     </Canvas>
//   </div>
// );

// export default StarsCanvas;
