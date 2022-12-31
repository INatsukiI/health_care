import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Button from "../components/button";
import { useAuth } from "../context/auth";
import { Content } from "../types/content";
// import DatePicker, { registerLocale } from "react-datepicker";
// import ja from "date-fns/locale/ja";
import "react-datepicker/dist/react-datepicker.css";
import { db } from "../firebase/client";
import { deleteDoc, doc, getDoc, setDoc } from "firebase/firestore";
import classNames from "classnames";

const HealthCareFrom = ({ isEditMode }: { isEditMode: boolean }) => {
  const { isLoading, fbUser, user } = useAuth();
  const Today = new Date();
  const [date, setDate] = useState(Today.toISOString());
  // registerLocale("ja", ja);
  const router = useRouter();
  const editTargetId = router.query.id;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Content>();

  useEffect(() => {
    if (fbUser && editTargetId) {
      const ref = doc(db, `users/${fbUser.uid}`, "contents", `${editTargetId}`);
      getDoc(ref).then((snap) => {
        const oldContent = snap.data() as Content;
        reset(oldContent);
      });
    }
  }, [editTargetId, fbUser, reset]);

  const onsetDate = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setDate(e.target.value);
  };

  if (isLoading) {
    return null;
  }

  if (!fbUser) {
    router.push("/login");
    return null;
  }

  const submit = (data: Content) => {
    if (!fbUser) {
      return null;
    }
    console.log(data);

    const ref = isEditMode
      ? doc(db, `users/${fbUser.uid}`, "contents", `${editTargetId}`)
      : doc(
          db,
          `users/${fbUser.uid}`,
          "contents",
          // `${Today.toISOString().split("T")[0]}`
          `${data.datetime}`
        );
    setDoc(ref, data, { merge: true }).then(() => {
      alert(isEditMode ? "編集を保存しました" : "今日の体調を記録しました");
      router.push("/health_care");
    });
  };

  const deleteContent = () => {
    const ref = doc(db, `users/${fbUser.uid}`, "contents", `${editTargetId}`);
    return deleteDoc(ref).then(() => {
      alert("削除しました");
      router.push("/health_care");
    });
  };

  return (
    <div className="container">
      <h1>{isEditMode ? "編集画面" : "ヘルスケアのフォーム"}</h1>
      <div className="flex flex-col justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className=" bg-white rounded-lg shadow dark:border md:mt-0 w-72 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <form onSubmit={handleSubmit(submit)} className="space-y-4">
              <div>
                <label className="block mb-0.5" htmlFor="datetime">
                  日付*
                </label>
                <input
                  className={classNames(
                    "rounded border",
                    errors.datetime ? "border-red-500" : "border-slate-300"
                  )}
                  {...register("datetime", {
                    required: "必須入力です",
                  })}
                  type="date"
                  value={date}
                  onChange={onsetDate}
                  id="datetime"
                  name="datetime"
                />
                {errors.datetime && (
                  <p className="text-red-500 mt-0.5">
                    {errors.datetime?.message}
                  </p>
                )}
                {/* <DatePicker
                dateFormat="yyyy-MM-dd"
                selected={date}
                {...register("datetime")}
                locale="ja"
                minDate={Today}
                onChange={(selectedDate) => {
                  setDate(selectedDate || Today);
                }}
                id="datetime"
                name="datetime"
              /> */}
              </div>
              <div>
                <label className="block mb-0.5" htmlFor="wight">
                  体重*
                </label>
                <input
                  className={classNames(
                    "rounded border",
                    errors.wight ? "border-red-500" : "border-slate-300"
                  )}
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
                {errors.wight && (
                  <p className="text-red-500 mt-0.5">{errors.wight?.message}</p>
                )}
              </div>
              <div>
                <label className="block mb-0.5" htmlFor="body_tmp">
                  体温*
                </label>
                <input
                  className={classNames(
                    "rounded border",
                    errors.body_tmp ? "border-red-500" : "border-slate-300"
                  )}
                  defaultValue={36.5}
                  {...register("body_tmp", {
                    required: "必須入力です",
                  })}
                  id="body_tmp"
                  name="body_tmp"
                  type="number"
                  step="0.1"
                />
                {errors.body_tmp && (
                  <p className="text-red-500 mt-0.5">
                    {errors.body_tmp?.message}
                  </p>
                )}
              </div>
              <Button>{isEditMode ? "更新" : "保存"}</Button>
              {isEditMode ? (
                <button type="button" onClick={deleteContent}>
                  削除
                </button>
              ) : (
                ""
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HealthCareFrom;
