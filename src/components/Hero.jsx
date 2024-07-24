import happyimage from '../assets/images/happy.webp'

const Hero = () => (
  <section className="bg-cover w-screen h-[28em] lg:h-[40em] py-4 px-2 lg:px-12  flex  flex-col items-left justify-center  " style={{
    backgroundImage: `url(${happyimage})`, backgroundSize: 'cover', backgroundPosition: 'center'
  }}>
    <h1 className=" text-2xl lg:text-4xl xl:text-5xl font-bold mb-4 ">Welcome to Happy Child</h1>
    <p className="text-2xl xl:text-3xl w-80 xl:w-[50%] mb-6">
      Monitor and analyse the emotions of students and children.
    </p>
    <div className="flex  gap-3">
      <button className="px-6 py-2 lg:text-2xl bg-blue-600 text-white rounded-full font-bold hover:bg-blue-700 transition">
        Get Started
      </button>
      <button className="px-6 py-2 lg:text-2xl bg-gray-200 text-blue-600  rounded-full font-bold  hover:bg-gray-300 transition">
        Learn More
      </button>
    </div>
  </section>
);

export default Hero;
