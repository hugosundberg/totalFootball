const About = () => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <div className="bg-black w-full h-screen text-white text-center pt-20 px-40">
        <p className="text-4xl font-bold my-5">Hi! My name is Hugo. </p>
        <p className="text-2xl">I am a webdeveloper with a passion for design. This is currently under development using React, TypeScript and Tailwind CSS. I am using API-FOOTBALL to fetch data. Please visit <a className="text-blue-400 hover:underline" href="https://hugosundberg.github.io/hugo/">my portfolio website</a> to checkout more of my work.</p>
      </div>
    </div>
  );
};

export default About;
