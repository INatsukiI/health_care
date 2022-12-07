import { useRouter } from "next/router";
import React from "react";
import { useForm } from "react-hook-form";
import Button from "../components/button";
import { useAuth } from "../context/auth";
import { Content } from "../types/content";
import DatePicker, { registerLocale } from "react-datepicker";
import ja from "date-fns/locale/ja";
import "react-datepicker/dist/react-datepicker.css";
import { db } from "../firebase/client";
import { doc, setDoc } from "firebase/firestore";

const HealthCare = () => {
  const { isLoading, fbUser, user } = useAuth();
  const Today = new Date();
  const [date, setDate] = React.useState(Today);
  registerLocale("ja", ja);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Content>();

  if (isLoading) {
    return null;
  }

  if (!fbUser) {
    router.push("/login");
    return null;
  } else {
    console.log(user);
  }

  const submit = (data: Content) => {
    if (!fbUser) {
      return null;
    }
    const ref = doc(
      db,
      `users/${fbUser.uid}`,
      "contents",
      `${Today.toISOString().split("T")[0]}`
    );
    setDoc(ref, { data }).then(() => {
      alert("今日の体調を記録しました");
      router.push("/health_care");
    });
  };

  return (
    <div>
      <h1>ヘルスケアのフォーム</h1>
      <form onSubmit={handleSubmit(submit)}>
        <div>
          <label>日付*</label>
          <DatePicker
            dateFormat="yyyy/MM/dd"
            selected={date}
            locale="ja"
            minDate={Today}
            onChange={(selectedDate) => {
              setDate(selectedDate || Today);
            }}
          />
        </div>
        <div>
          <label htmlFor="wight">体重*</label>
          <input
            defaultValue={50.5}
            autoComplete="wight"
            {...register("wight", {
              required: "必須入力です",
            })}
            id="wight"
            name="wight"
            type="number"
            step="0.1"
          />
          {errors.wight && <p>{errors.wight?.message}</p>}
        </div>
        <div>
          <label htmlFor="body_tmp">体温*</label>
          <input
            defaultValue={36.5}
            {...register("body_tmp", {
              required: "必須入力です",
            })}
            id="body_tmp"
            name="body_tmp"
            type="number"
            step="0.1"
          />
          {errors.body_tmp && <p>{errors.body_tmp?.message}</p>}
        </div>
        <Button>保存</Button>
      </form>
    </div>
  );
};

export default HealthCare;
