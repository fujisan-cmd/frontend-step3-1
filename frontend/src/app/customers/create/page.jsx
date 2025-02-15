"use client"
import { useRef } from 'react';
import { useRouter } from 'next/navigation';

import createCustomer from './createCustomer';

export default function CreatePage() {
    const formRef = useRef();
    const IDCheckRef = useRef(); // 追記部分
    const router = useRouter();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(formRef.current);
        console.log("ID:"+formData.get("customer_id"));
        if (formData.get("customer_id") != "") // 追記部分
        {
            IDCheckRef.current.textContent = ""; // 追記部分
            await createCustomer(formData);
            router.push(`./create/confirm?customer_id=${formData.get("customer_id")}`);
        }
        else{
            console.log("IDは必須項目です!"); // 追記部分
            IDCheckRef.current.textContent = "IDは必須項目です!"; // 追記部分
        }
    };

    return (
        <>
            <div className="card bordered bg-white border-blue-200 border-2 max-w-md m-4">
                <div className="m-4 card bordered bg-blue-200 duration-200 hover:border-r-red">
                    <form ref={formRef} onSubmit={handleSubmit}>
                        <div className="card-body">
                            <h2 className="card-title">
                                <p><input type="text" name="customer_name" placeholder="桃太郎" className="input input-bordered" /></p>
                            </h2>
                            <p>Customer ID:<input type="text" name="customer_id" placeholder="C030" className="input input-bordered" /></p>
                            <p>Age:<input type="number" name="age" placeholder="30" className="input input-bordered" /></p>
                            <p>Gender:<input type="text" name="gender" placeholder="女" className="input input-bordered" /></p>
                            <p ref={IDCheckRef} className="text-red-900"></p> {/* 追記部分 */}
                        </div>
                        <div className="flex justify-center">
                            <button type="submit" className="btn btn-primary m-4 text-2xl">
                                作成
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}



