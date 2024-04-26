export default function Card(props) {
  return (
    <main className={`w-full min-h-screen max-h-full bg-gradient-to-r from-violet-200 to-pink-200 pt-2 pb-2`}>
      {/*  прибрала  max-w-3xl!!! */}
      <div className={`mx-auto ${props.maxW} shadow-2xl mt-3 p-4 rounded-2xl bg-white`}>
        {props.children}
      </div>
    </main>
  );
}
