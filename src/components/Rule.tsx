import { Link } from "react-router-dom";

export default function Rule() {
  return (
    <>
      <div className="flex justify-center items-center absolute">
        <Link
          to={"/"}
          className="flex flex-row justify-center items-center gap-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.7"
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
            />
          </svg>
          Back
        </Link>
      </div>
      <div className="flex flex-col items-center justify-center">
        <div className="text-4xl md:text-4xl font-bold mt-12 md:mt-7">
          How to play / Rule
        </div>
        <div className=" text-xl leading-10 text-primary mt-5">
          เดาคำศัพท์ภาษาอังกฤษ โดยจะมีการแสดงสี
          <br />
          สีเหลืองคือ มีตัวอักษรนั้นในคำ แต่ตำแหน่งยังไม่ถูก
          <br />
          สีส้มคือ มีตัวอักษรนั้นในคำมากกว่า 1 ตัว
          <br />
          สีเขียวคือ ตัวอักษรอยู่ในตำแหน่งที่ถูก
          <ol className="list-disc">
            <li>
              ระดับง่ายจะให้พิมพ์ได้ 10 ครั้ง จำนวนตัวอักษรจะสุ่มที่ 5-7 ตัว
            </li>
            <li>
              ระดับปานกลางจะให้พิมพ์ได้ 5 ครั้ง จำนวนตัวอักษรจะสุ่มที่ 5-7 ตัว
            </li>
            <li>
              ระดับปานยากจะให้พิมพ์ได้ 5 ครั้ง จำนวนตัวอักษรจะสุ่มที่ 5-7 ตัว
              แต่จะไม่มีการบอกตำแหน่ง (ไม่มีสีเขียวให้)
            </li>
            <li>
              Custom สามารถกรอกจำนวนตัวอักษร และ จำนวนรอบที่ต้องการเล่นได้เลย
            </li>
          </ol>
        </div>
        <p className="mt-10">หน้านี้แค่ชั่วคราว จะมีการตกแต่งภายหลัง</p>
      </div>
    </>
  );
}
