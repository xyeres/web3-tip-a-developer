// Animations
import { Tween } from "react-gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { gsap } from "gsap";
gsap.registerPlugin(ScrollTrigger);


const GSAPExample = () => {
  return (
    <>

      <header className="header-bg-minimal max-w-lg min-w-full min-h-[100vh] md:min-h-0 py-24 md:py-48 justify-center text-gray-100 mx-auto my-0 flex flex-col gap-8 items-center">
        <Tween
          ease="slow(0.7, 0.7, false)"
          to={{
            y: "-180px",
            opacity: 0,
            scrollTrigger: {
              trigger: "h1",
              start: "-170px top",
              end: "330px 200px",
              scrub: 1,
            },
          }}
        >
          <h1 className="text-2xl font-bold text-center">Heading</h1>

          <p>All inner header content fades out</p>
        </Tween>
      </header>
      <Tween
        to={{
          y: "-250px",
          scrollTrigger: {
            trigger: ".projects",
            start: "0px center",
            end: "+=100% 20px",
            scrub: 1,
            markers: true,

          },
        }}
      >
        <main className="projects bg-white min-w-full text-gray-200 min-h-[200vh] max-w-xl mx-auto my-10">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati maxime ab, aliquam quas, sint sit delectus officiis numquam reprehenderit saepe sequi! Tempora illo ipsum distinctio quo animi, perspiciatis nisi possimus.
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati maxime ab, aliquam quas, sint sit delectus officiis numquam reprehenderit saepe sequi! Tempora illo ipsum distinctio quo animi, perspiciatis nisi possimus.
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati maxime ab, aliquam quas, sint sit delectus officiis numquam reprehenderit saepe sequi! Tempora illo ipsum distinctio quo animi, perspiciatis nisi possimus.
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati maxime ab, aliquam quas, sint sit delectus officiis numquam reprehenderit saepe sequi! Tempora illo ipsum distinctio quo animi, perspiciatis nisi possimus.
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati maxime ab, aliquam quas, sint sit delectus officiis numquam reprehenderit saepe sequi! Tempora illo ipsum distinctio quo animi, perspiciatis nisi possimus.
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati maxime ab, aliquam quas, sint sit delectus officiis numquam reprehenderit saepe sequi! Tempora illo ipsum distinctio quo animi, perspiciatis nisi possimus.
        </main>
      </Tween>
    </>
  )
}

export default GSAPExample