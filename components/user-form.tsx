import classNames from "classnames";
import { doc, setDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import React from "react";
import { useForm } from "react-hook-form";
import Button from "../components/button";
import { useAuth } from "../context/auth";
import { db } from "../firebase/client";
import { User } from "../types/user";

const UserForm = () => {
  const { isLoading, fbUser } = useAuth();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<User>();

  if (isLoading) {
    return null;
  }

  if (!fbUser) {
    router.push("/login");
    return null;
  }

  const submit = (data: User) => {
    if (!fbUser) {
      return null;
    }
    const ref = doc(db, `users/${fbUser.uid}`);
    setDoc(ref, { name: data.name, profile: data.profile }).then(() => {
      alert("ユーザーを作成しました");
      router.push("/");
    });
  };

  return (
    <div className="container">
      <h1>アカウント作成</h1>
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <form onSubmit={handleSubmit(submit)} className="space-y-4">
              <div>
                <label className="block mb-0.5" htmlFor="name">
                  名前*
                </label>
                <input
                  className={classNames(
                    "rounded border",
                    errors.name ? "border-red-500" : "border-slate-300"
                  )}
                  autoComplete="name"
                  {...register("name", {
                    required: "必須入力です",
                    maxLength: {
                      value: 50,
                      message: "最大50文字です",
                    },
                  })}
                  id="name"
                  name="name"
                  type="text"
                />
                {errors.name && (
                  <p className="text-red-500 mt-0.5">{errors.name?.message}</p>
                )}
              </div>
              <div>
                <label className="block mb-0.5" htmlFor="profile">
                  プロフィール*
                </label>
                <textarea
                  className={classNames(
                    "rounded border",
                    errors.name ? "border-red-500" : "border-slate-300"
                  )}
                  defaultValue=""
                  {...register("profile", {
                    required: "必須入力です",
                    maxLength: {
                      value: 255,
                      message: "最大255文字です",
                    },
                  })}
                  id="profile"
                  name="profile"
                />
                <p className="text-sm text-slate-400 leading-none">
                  {watch("profile")?.length || 0}/255
                </p>
                {errors.profile && (
                  <p className="text-red-500 mt-0.5">
                    {errors.profile?.message}
                  </p>
                )}
              </div>
              <Button>アカウント作成</Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserForm;
