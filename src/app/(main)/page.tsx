import Image from "next/image";

export default function Home() {
  return (
    <>


      <section className="max-w-7xl mx-auto px-4 sm:px-10 mt-10 flex flex-col lg:flex-row items-center lg:items-start gap-10">
        <div className="lg:w-1/2 max-w-lg">
          <p className="text-xs text-[#ff9a5a] font-semibold tracking-widest mb-2">
            THE BEST KINDERGARTEN
          </p>
          <h1 className="text-4xl sm:text-5xl font-semibold text-[#2f3e4e] leading-tight mb-4">
            Join our friendly
            <span className="text-[#ff9a5a]">
              Zippy
            </span>
            family
          </h1>
          <p className="text-xs text-gray-500 mb-6">
            We have a unique program that helps each child quickly adapt and feel at home. We also help each child find his own way. Become a person, be happy and change the world for the better.
          </p>
          <div className="flex items-center space-x-6">
            <button className="bg-[#ff9a5a] text-white text-xs font-semibold rounded-full px-6 py-2 hover:bg-[#e07a3f] transition flex items-center space-x-2">
              <span>
                Start today
              </span>
              <i className="fas fa-arrow-right text-xs">
              </i>
            </button>
            <div className="flex items-center space-x-2 text-gray-400 text-xs font-semibold">
              <div className="w-6 h-6 rounded-full bg-[#e6f0f6] flex items-center justify-center">
                <i className="fas fa-phone-alt text-[#7ea6b9] text-[10px]">
                </i>
              </div>
              <span>
                +1 800 700 000
              </span>
            </div>
          </div>
          <div className="flex space-x-2 mt-6 text-gray-300 text-xs font-semibold">
            <span className="cursor-pointer hover:text-[#ff9a5a]">
              ●
            </span>
            <span className="cursor-pointer hover:text-[#ff9a5a]">
              ●
            </span>
            <span className="cursor-pointer hover:text-[#ff9a5a]">
              ●
            </span>
          </div>
        </div>
        <div className="lg:w-1/2 relative max-w-lg">
          <div className="rounded-[50%_50%_50%_50%/40%_40%_60%_60%] border-8 border-[#c6d9e3] overflow-hidden">
            <img alt="Child wearing aviator hat playing with wooden toy plane on carpet in a bright room with bookshelf and globe" className="w-full h-auto object-cover" height="400" src="https://storage.googleapis.com/a1aa/image/cc301b4b-e038-4573-5720-460f1c714ab7.jpg" width="600" />
          </div>
          <img alt="Cute cartoon dinosaur decoration above hero stats section" className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-24 h-24 object-contain select-none pointer-events-none" height="100" src="https://storage.googleapis.com/a1aa/image/84931b57-b22f-4af8-cb37-ca66a844262e.jpg" width="100" />
        </div>
      </section>

      <section className="max-w-4xl mx-auto mt-20 bg-[#f7efe6] rounded-3xl px-8 py-10 flex flex-col sm:flex-row justify-between text-center sm:text-left space-y-10 sm:space-y-0 sm:space-x-10 relative">
        <div className="sm:border-r border-[#d9d9d9] sm:pr-10">
          <h2 className="text-4xl font-bold text-[#7ea6b9] mb-2">
            769
          </h2>
          <h3 className="font-semibold text-gray-700 mb-2">
            Happy children
          </h3>
          <p className="text-xs text-gray-500 max-w-xs mx-auto sm:mx-0">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque eget elit et elit dignissim vehicula. Nullam et sodales sapien.
          </p>
        </div>
        <div className="sm:border-r border-[#d9d9d9] sm:px-10">
          <h2 className="text-4xl font-bold text-[#7ea6b9] mb-2">
            32K
          </h2>
          <h3 className="font-semibold text-gray-700 mb-2">
            Hours worked
          </h3>
          <p className="text-xs text-gray-500 max-w-xs mx-auto sm:mx-0">
            Pellentesque vulputate nulla magna bibendum, vitae convallis lacus sodales. Aenean cursus eros. Vestibulum at tristique erat.
          </p>
        </div>
        <div className="sm:pl-10">
          <h2 className="text-4xl font-bold text-[#7ea6b9] mb-2">
            184
          </h2>
          <h3 className="font-semibold text-gray-700 mb-2">
            Awards received
          </h3>
          <p className="text-xs text-gray-500 max-w-xs mx-auto sm:mx-0">
            Etiam porta velit eu bibendum rhoncus. Fusce sem metus, lacinia, laoreet aliquam fringilla nec blandit. Sed convallis eros, quis odio.
          </p>
        </div>
      </section>
      <section className="max-w-7xl mx-auto px-4 sm:px-10 mt-20 flex flex-col lg:flex-row items-center gap-10">
        <div className="relative lg:w-1/2 max-w-md">
          <img alt="Smiling child with orange rocket backpack pointing up, isolated on white background with light blue abstract shape behind" className="relative z-10 rounded-full" height="400" src="https://storage.googleapis.com/a1aa/image/481d26af-995f-44e9-112f-63520e8420c3.jpg" width="400" />
          <img alt="Light blue abstract shape behind child image" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full opacity-50 pointer-events-none select-none" height="300" src="https://storage.googleapis.com/a1aa/image/a1dbfa68-19c0-4ec1-c531-3224652062b8.jpg" style={{ zIndex: '0' }} width="300" />
          <div className="absolute bottom-0 left-0 w-20 h-20 bg-orange-400 rounded-lg rotate-12 shadow-lg pointer-events-none select-none" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 80%)' }} >
          </div>
          <div className="absolute bottom-0 right-0 w-20 h-20 bg-orange-400 rounded-lg rotate-12 shadow-lg pointer-events-none select-none" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 80%, 0 100%)' }}  >
          </div>
        </div>
        <div className="lg:w-1/2 max-w-lg">
          <p className="text-xs text-[#ff9a5a] font-semibold tracking-widest mb-2">
            KINDERGARTEN
          </p>
          <h2 className="text-3xl font-semibold text-[#2f3e4e] mb-6">
            About us
          </h2>
          <p className="text-xs text-gray-500 mb-8">
            We are carefully exploring the range of services offered, seeking care of children of all ages. Our goal is to carefully educate and develop each child’s talents. We strive to turn the learning process into a bright, memorable children’s day with pleasure.
          </p>
          <div className="flex flex-col space-y-6 mb-8">
            <div className="flex items-start space-x-4">
              <div className="text-[#ff9a5a] text-2xl mt-1">
                <i className="fas fa-award">
                </i>
              </div>
              <div>
                <h3 className="font-semibold text-gray-700 mb-1">
                  Experienced teachers
                </h3>
                <p className="text-xs text-gray-500">
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit. Simper veniam error, itaque, et assumenda, quidem ea nihil numquam qui. Facilis tenetur obcaecati iusto autem fuga ducimus.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="text-[#ff9a5a] text-2xl mt-1">
                <i className="fas fa-lightbulb">
                </i>
              </div>
              <div>
                <h3 className="font-semibold text-gray-700 mb-1">
                  Unique approach
                </h3>
                <p className="text-xs text-gray-500">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptates, explicabo ut! Habitant et totam, autem, asperiores, repellendus aspernatur.
                </p>
              </div>
            </div>
          </div>
          <button className="bg-[#ff9a5a] text-white text-xs font-semibold rounded-full px-6 py-2 hover:bg-[#e07a3f] transition flex items-center space-x-2">
            <span>
              Schedule a tour
            </span>
            <i className="fas fa-arrow-right text-xs">
            </i>
          </button>
        </div>
      </section>

      <section className="mt-20 bg-[#e6f0f6] py-16 px-4 sm:px-10 relative overflow-hidden"></section>

    </>
  );
}
