import { useState, useEffect } from "react";
import { useNavigate } from "@shopify/app-bridge-react";

import { CustomizationForm, CustomizationPageLayout } from "../../components";
import {
  useCustomizationForm,
  useCreateDeliveryCustomization,
} from "../../hooks";

export default function NewDeliveryCustomizationPage() {
  const navigate = useNavigate();

  const [userErrors, setUserErrors] = useState(null);

  const { handleInputChange, setData, data: formData } = useCustomizationForm();

  const { mutateAsync: createCustomization, isLoading } =
    useCreateDeliveryCustomization();

  const handleSubmit = async () => {
    if (isLoading) return;
    try {
      const data = await createCustomization({ payload: formData });
      if (data?.userErrors) {
        setUserErrors(data.userErrors);
      } else {
        navigate("/");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const primaryAction = {
    disabled: isLoading,
    onAction: handleSubmit,
  };

  useEffect(() => {
    setData({
      deliveryOptionName: "Express",
      operation: "Hide",
    });
  }, []);

  return (
    <CustomizationPageLayout
      title="Hide Delivery Option"
      loading={isLoading}
      actionProps={primaryAction}
      subtitle="Any delivery option matching this name exactly will be hidden."
      userErrors={userErrors}
    >
      <CustomizationForm
        {...formData}
        isNewCustomization={true}
        loading={isLoading}
        disabled={isLoading}
        onSubmit={handleSubmit}
        onInputChange={handleInputChange}
      />
    </CustomizationPageLayout>
  );
}
