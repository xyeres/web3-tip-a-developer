export type Memo = {
  address: string;
  timestamp: number;
  name: string;
  message: string;
};

type Props = {
  memos: Memo[];
};

const Memos = (props: Props) => {
  return (
    <>
      {props.memos.map((memo: Memo, i: number) => (
        <div
          key={memo.timestamp.toString()}
          className="hover:opacity-100 hover:bg-neutral-800 bg-[#121212] transition-all duration-150 opacity-80 w-full mt-[43px] p-6 flex flex-col"
        >
          <p className="text-xl font-extralight">{memo.message}</p>
          <span className="self-end mt-3 text-[.675rem]">
            <>&mdash; {memo.name} on {(new Date(memo.timestamp * 1000)).toLocaleDateString()}</>
          </span>
        </div>
      ))}
    </>
  );
};

export default Memos;
