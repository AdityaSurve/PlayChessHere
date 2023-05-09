interface Props {
  image?: string;
  number: number;
}

export default function Tile({ number, image }: Props) {
  const type = number % 2 === 0 ? "#825A34" : "#C29E65";
  return (
    <div
      className="flex justify-center items-center w-[40px] md:w-[75px] h-[40px] md:h-[75px]"
      style={{
        backgroundColor: `${type}`,
      }}
    >
      {image && (
        <div
          className="PIECE w-[40px] md:w-[75px] h-[40px] md:h-[75px] active:cursor-grabbing hover:cursor-grab"
          style={{
            backgroundImage: `url(${image})`,
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "100%",
          }}
        />
      )}
    </div>
  );
}
