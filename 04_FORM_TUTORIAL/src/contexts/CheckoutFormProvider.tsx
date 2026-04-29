import { createContext, PropsWithChildren, useContext, useState } from 'react';
import { PersonalInfo } from '../schemas/personal-info.schema';
import { PaymentInfo } from '../schemas/payment.schema';
import { router } from 'expo-router';

type CheckoutFormContext = {
  personalInfo: PersonalInfo | undefined;
  setPersonalInfo: (info: PersonalInfo | undefined) => void;
  paymentInfo: PaymentInfo | undefined;
  setPaymentInfo: (info: PaymentInfo | undefined) => void;
  onSubmit: () => void;
};

const CheckoutFormContext = createContext<CheckoutFormContext>({
  personalInfo: undefined,
  setPersonalInfo: () => {},
  paymentInfo: undefined,
  setPaymentInfo: () => {},
  onSubmit: () => {},
});

export default function CheckoutFormProvider({ children }: PropsWithChildren) {
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo | undefined>();
  const [paymentInfo, setPaymentInfo] = useState<PaymentInfo | undefined>();

  function onSubmit() {
    if (!personalInfo || !paymentInfo) {
      console.log('Form is incomplete');
      return;
    }

    // Send it to server or do something with it

    setPersonalInfo(undefined);
    setPaymentInfo(undefined);

    router.dismissAll();
    router.back();
  }

  return (
    <CheckoutFormContext.Provider
      value={{
        personalInfo,
        setPersonalInfo,
        paymentInfo,
        setPaymentInfo,
        onSubmit,
      }}
    >
      {children}
    </CheckoutFormContext.Provider>
  );
}

export const useCheckoutForm = () => useContext(CheckoutFormContext);
