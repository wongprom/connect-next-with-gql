import { useForm, FormProvider, useFormContext } from 'react-hook-form';

const CarForm = () => {
  const title = 'Add car to firebase';
  const {
    register,
    formState: { errors },
    ...methods
  } = useFormContext();
  return (
    <div className="">
      <h2 className="py-2 pl-4 bg-moveIt-primaryLightBlue font-semibold">
        {title}
      </h2>
      <div className="p-4 grid grid-cols-1 md:grid-cols-2 md:gap-4 bg-moveIt-primaryBlue">
        <div className="">
          <div className=" mb-2 flex flex-col ">
            <label className="pb-2 font-light text-xs " htmlFor="mark">
              Mark:{' '}
            </label>
            <input
              className={`p-2 border  ${errors.mark ? 'bg-red-100' : ''}`}
              {...register('mark', { required: true })}
            />
            {errors.mark && <span>Mark is required</span>}
          </div>
          <div className=" mb-2 flex flex-col ">
            <label className="pb-2 font-light text-xs " htmlFor="modell">
              Modell:{' '}
            </label>
            <input
              className={`p-2 border  ${errors.modell ? 'bg-red-100' : ''}`}
              {...register('modell', { required: true })}
            />
            {errors.modell && <span>Modell is required</span>}
          </div>

          <div className="mb-2  flex flex-col">
            <label className=" pb-2 font-light text-xs" htmlFor="year">
              Year:{' '}
            </label>
            <input
              className={`p-2 border  ${errors.year ? 'bg-red-100' : ''}`}
              // defaultValue="year"
              type="number"
              {...register(
                'year',
                { required: true },
                {
                  maxLength: 4,
                  minLength: 4,
                }
              )}
            />
            {errors.year && <span>Year is required</span>}
          </div>
          <div className="mb-2  flex flex-col">
            <label className=" pb-2 font-light text-xs" htmlFor="horsePower">
              Horsepower:{' '}
            </label>
            <input
              className={`p-2 border  ${errors.year ? 'bg-red-100' : ''}`}
              // defaultValue="year"
              type="number"
              {...register('horsePower')}
            />
          </div>
        </div>
        <div>
          <div className=" mb-2 flex flex-col ">
            <label className="pb-2 font-light text-xs " htmlFor="description">
              Description:{' '}
            </label>
            <input
              className={`p-2 border  ${
                errors.description ? 'bg-red-100' : ''
              }`}
              {...register('description', { required: true })}
            />
            {errors.description && <span>Description is required</span>}
          </div>

          <div className="mb-2 flex flex-col">
            <label className=" pb-2 font-light text-xs" htmlFor="color">
              Color:{' '}
            </label>
            <input
              className={`p-2 border ${errors.color ? 'bg-red-100' : ''}`}
              {...register('color')}
            />
            {errors.color && <span>Color is required</span>}
          </div>
        </div>
      </div>

      {/* include validation with required or other standard HTML validation rules */}
    </div>
  );
};

export default CarForm;
