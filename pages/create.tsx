import { useRouter } from "next/router";
import React from "react";
import { useForm } from "react-hook-form";
import Button from "../components/button";
import { useAuth } from "../context/auth";
import { User } from "../types/user";

const Create = () => {
  const { isLoading, isLoggedin } = useAuth();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<User>();

  const submit = (data: User) => {
    console.log(data);
  };

  if (isLoading) {
    return null;
  }

  if (!isLoggedin) {
    router.push("/login");
    return null;
  }

  return (
    <div>
      <h1>アカウント作成</h1>
      <form onSubmit={handleSubmit(submit)}>
        <div>
          <label htmlFor="name">名前*</label>
          <input
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
          {errors.name && <p>{errors.name?.message}</p>}
        </div>
        <div>
          <label htmlFor="nickname">ニックネーム*</label>
          <input
            autoComplete="off"
            {...register("nickname", {
              required: "必須入力です",
              maxLength: {
                value: 50,
                message: "最大50文字です",
              },
            })}
            id="nickname"
            name="nickname"
            type="text"
          />
          {errors.nickname && <p>{errors.nickname?.message}</p>}
        </div>
        <div>
          <label htmlFor="profile">プロフィール*</label>
          <textarea
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
          <p>{watch("profile")?.length || 0}/255</p>
          {errors.profile && <p>{errors.profile?.message}</p>}
        </div>
        <Button>アカウント作成</Button>
      </form>
    </div>
  );
};

export default Create;
