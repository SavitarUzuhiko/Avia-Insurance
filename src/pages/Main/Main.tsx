import type { RootState } from "@/app/store";
import { Heading } from "@/constants";
import { useSelector } from "react-redux";
import { Contract, FormDate } from "./components";
import { DataTravellers } from "./components/Data_Travellers";
import { FormProvider, useForm, useFieldArray } from "react-hook-form";

export const Main = () => {
  const methods = useForm({
    defaultValues: {
      buyerIndex: 0, // default first traveller as buyer
      travellers: [{ firstName: "", lastName: "", birthDate: "" }]
    }
  });

  const { control, handleSubmit, watch } = methods;

  const { fields, append } = useFieldArray({
    control,
    name: "travellers"
  });

  const onSubmit = (data: any) => {
    console.log(data);
  };

  const { language } = useSelector((state: RootState) => state.aviaslice);
  const heading = Heading.find((h) => h.lang === language);

  const buyerIndex = watch("buyerIndex");

  return (
    <div className="pb-20">
      <h2 className="text-white text-3xl text-center mx-auto font-bold max-w-[290px] my-3">
        {heading?.title}
      </h2>

      <FormDate />
      <Contract />

      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-10 my-10">
          {fields.map((_, index) => (
            <DataTravellers
              key={fields[index].id}
              num={index + 1}
              index={index}
              isBuyer={buyerIndex === index}
            />
          ))}

          <div className="flex gap-3">
            <button
              type="button"
              onClick={() =>
                append({ firstName: "", lastName: "", birthDate: "" })
              }
              className="rounded-lg bg-[#0063bb] text-white py-4 text-[16px] font-bold w-full"
            >
              Add traveler
            </button>
          </div>
        </form>
      </FormProvider>

      <div className="text-gray-500 text-sm flex flex-col items-center my-10 leading-6">
        <span>
          I am familiar with the{" "}
          <a href="#" className="underline">
            User Agreement, offer
          </a>{" "}
        </span>
        <a href="#" className="underline">
          agreement and I
        </a>
        <a href="#" className="underline">
          consent to the processing of personal data
        </a>
      </div>
    </div>
  );
};
