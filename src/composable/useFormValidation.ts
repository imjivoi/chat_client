import {reactive} from "vue";
import useValidators from './useValidators'

const errors = reactive<{ [key: string]: string; }>({});

export default function useFormValidation() {
  const {isEmpty, minLength, isEmail} = useValidators();
  const validateNameField = (fieldName: string, fieldValue: string) => {
    errors[fieldName] = !fieldValue ? isEmpty(fieldName, fieldValue) : minLength(fieldName, fieldValue, 4)
  }
  const validateEmailField = (fieldName: string, fieldValue: string) => {
    errors[fieldName] = !fieldValue ? isEmpty(fieldName, fieldValue) : isEmail(fieldName, fieldValue)
  }
  const validatePasswordField = (fieldName: string, fieldValue: string) => {
    errors[fieldName] = !fieldValue ? isEmpty(fieldName, fieldValue) : minLength(fieldName, fieldValue, 6)
  }
  return {errors, validateNameField, validateEmailField, validatePasswordField}
}
