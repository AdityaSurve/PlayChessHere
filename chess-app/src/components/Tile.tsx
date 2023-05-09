interface Props {
  image?: string;
  number: number;
}

export default function Tile({ number, image }: Props) {
  if (number % 2 === 0) {
    return (
      <div className="flex justify-center items-center bg-[#825A34] w-[40px] md:w-[75px] h-[40px] md:h-[75px]">
        <img
          src={image}
          alt=""
          className="h-[36px] md:h-[70px] w-[36px] md:w-[70px]"
        />
      </div>
    );
  } else {
    return (
      <div className="flex justify-center items-center bg-[#C29E65] w-[40px] md:w-[75px] h-[40px] md:h-[75px]">
        <img
          src={image}
          alt=""
          className="h-[36px] md:h-[70px] w-[36px] md:w-[70px]"
        />
      </div>
    );
  }
}
