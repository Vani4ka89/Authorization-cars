import {FC, useEffect} from 'react';
import {SubmitHandler, useForm} from "react-hook-form";

import {ICar} from "../../../interfaces";
import {useAppDispatch, useAppSelector} from "../../../hooks";
import {carActions} from "../../../store";

const CarForm: FC = () => {
    const {
        reset, register, handleSubmit,
        setValue, formState: {errors, isValid}
    } = useForm<ICar>();
    const {carForUpdate} = useAppSelector(state => state.cars);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (carForUpdate) {
            setValue('brand', carForUpdate.brand, {shouldValidate: true});
            setValue('price', carForUpdate.price, {shouldValidate: true});
            setValue('year', carForUpdate.year, {shouldValidate: true});
        }
    }, [carForUpdate, setValue]);

    const save: SubmitHandler<ICar> = async (car) => {
        await dispatch(carActions.create({car}));
        reset();
    };

    const update: SubmitHandler<ICar> = async (car) => {
        await dispatch(carActions.update({id: carForUpdate.id, car}));
        dispatch(carActions.setCarForUpdate(null));
        reset();
    };

    return (
        <form onSubmit={handleSubmit(carForUpdate ? update : save)}>
            <input type="text" placeholder={'brand'} {...register('brand', {required: true})}/>
            {/*{errors && <div>{errors.brand.message}</div>}*/}
            <input type="text" placeholder={'price'} {...register('price', {required: true})}/>
            {/*{errors && <div>{errors.price.message}</div>}*/}
            <input type="text" placeholder={'year'} {...register('year', {required: true})}/>
            {/*{errors && <div>{errors.year.message}</div>}*/}
            <button disabled={!isValid}>{carForUpdate ? 'Update' : 'Create'}</button>
        </form>
    );
};

export {CarForm};