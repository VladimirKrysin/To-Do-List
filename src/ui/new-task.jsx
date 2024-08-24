import { Flex } from "@mantine/core";
import { useForm, useController } from "react-hook-form";
import styles from "../components/dashboard/dashboard.module.css"
import { FormInputBase } from "./form-input-base.jsx";

export const NewTask = () => {
    const { control, register, handleSubmit, formState: { errors } } = useForm({ defaultValues: { title: "", date: "", priority: "", address: "" } });
    const onSubmit = () => console.log('test');
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <label htmlFor="title">Title</label>
                <input {...register("title", {
                    required: {
                        value: true,
                        message: "Title required"
                    }
                })} id="title" type="text" />
                <p className={styles.errorMessage}>{errors.title?.message}</p>

            </div>
            <div>
                <label htmlFor="date">Date</label>
                <input {...register("date", {
                    required: {
                        value: true,
                        message: "Date required"
                    }
                })} id="date" type="date" />
                <p className={styles.errorMessage}>{errors.date?.message}</p>
            </div>
            <Flex>
                <div>
                    <label htmlFor="extreme">Extreme</label>
                    <input {...register("priority", {
                        required: {
                            value: true,
                            message: "Priority required"
                        }
                    })} id="extreme" type="radio" />
                </div>
                <div>
                    <label htmlFor="moderate">Moderate</label>
                    <input {...register("priority", {
                        required: {
                            value: true,
                            message: "Priority required"
                        }
                    })} id="moderate" type="radio" />
                </div>
                <div>
                    <label htmlFor="low">Low</label>
                    <input {...register("priority", {
                        required: {
                            value: true,
                            message: "Priority required"
                        }
                    })} id="low" type="radio" />
                </div>
                <p className={styles.errorMessage}>{errors.priority?.message}</p>
                <FormInputBase control={control} name="address" />
            </Flex>
            <input type="submit" />
        </form>
    );
}
