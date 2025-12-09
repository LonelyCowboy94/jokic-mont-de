import Image from "next/image";

function NewsCard() {
  return (
    <div className="rounded-xl overflow-hidden shadow-md bg-white hover:shadow-xl transition">
      <Image src='https://res.cloudinary.com/dbhtd4ffm/image/upload/v1762760743/image-960x960_bs1a1b.jpg' alt='slika' width={150} height={150}></Image>

      <div className="p-4">
        <p className="text-sm text-gray-500">08.12.2025</p>
        <h3 className="text-xl font-semibold mt-2 mb-3">Naslov</h3>
        <p className="text-gray-700 line-clamp-3">Opis</p>

        <a
          href={`/aktuelles/item-slug`}
          className="text-blue-600 font-medium mt-4 inline-block"
        >
          Mehr lesen →
        </a>
      </div>
    </div>
  );
}

export default NewsCard;
