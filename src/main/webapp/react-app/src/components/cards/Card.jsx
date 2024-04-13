export default function Card(props) {
  return (
    <main className={`w-full h-${props.height} bg-gradient-to-r from-violet-200 to-pink-200 pt-2 pb-2`}>
      <div className="mx-auto max-w-3xl shadow-2xl mt-3 p-4 rounded-2xl bg-white">
        {props.children}
      </div>
    </main>
  );
}
