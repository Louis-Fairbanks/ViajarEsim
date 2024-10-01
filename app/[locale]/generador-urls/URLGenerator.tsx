'use client'
import React, { useState, useRef, useMemo } from "react";
import ButtonDark from "../components/ReusableComponents/ButtonDark";

// Define the type for a single plan
type Plan = [number, string, number, string, string, string, string];

// Define the type for a selected plan
interface SelectedPlan {
  plan: Plan;
  quantity: number;
}

// Import planData with the correct type
import planData from "./AllPlansTemporary";

const URLGenerator: React.FC = () => {
  const [selectedPlans, setSelectedPlans] = useState<SelectedPlan[]>([]);
  const [url, setUrl] = useState<string>("");
  const [filter, setFilter] = useState<string>("");
  const [copySuccess, setCopySuccess] = useState<string>("");
  const urlInputRef = useRef<HTMLInputElement>(null);

  const filteredPlans = useMemo(() => {
    return planData.filter((plan : Plan) => {
      const region = plan[5].toString().toLowerCase();
      const name = plan[3].toString().toLowerCase();
      const filterLower = filter.toLowerCase();
      return region.includes(filterLower) || name.includes(filterLower);
    });
  }, [filter]);

  const handlePlanSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedPlanId = parseInt(e.target.value);
    const selectedPlan = planData.find((plan : Plan) => plan[0] === selectedPlanId);
    if (
      selectedPlan &&
      !selectedPlans.some((p) => p.plan[0] === selectedPlan[0])
    ) {
      setSelectedPlans([...selectedPlans, { plan: selectedPlan, quantity: 1 }]);
    }
  };

  const handleQuantityChange = (planId: number, newQuantity: number) => {
    setSelectedPlans(
      selectedPlans.map((item) =>
        item.plan[0] === planId
          ? { ...item, quantity: Math.max(1, newQuantity) }
          : item
      )
    );
  };

  const handleRemovePlan = (planId: number) => {
    setSelectedPlans(selectedPlans.filter((item) => item.plan[0] !== planId));
  };

  const generateURL = () => {
    const planParams = selectedPlans
      .map((item) => {
        const plan = item.plan;
        const dataParam =
          plan[1] === "unlimited" ? "datos-ilimitados" : `${plan[1]}-gb`;
        return `plan=${plan[5].toLowerCase().replace(/ /g, "-")},${plan[2]}-dias,${dataParam},${item.quantity}`;
      })
      .join("&");

    setUrl(`https://viajaresim.com/pago?${planParams}`);
  };

  const copyToClipboard = () => {
    if (urlInputRef.current) {
      urlInputRef.current.select();
      try {
        document.execCommand("copy");
        setCopySuccess("¡Copiado!");
      } catch (err) {
        setCopySuccess(
          "Error al copiar. Intenta seleccionar y copiar manualmente."
        );
      }
      window.getSelection()?.removeAllRanges();
    }
    setTimeout(() => setCopySuccess(""), 3000);
  };

  return (
    <div className="p-4 font-sans max-w-2xl mx-auto box-border">
      <h1 className="text-2xl md:text-3xl font-bold mb-4 text-center">
        Generador de URL para ViajareSIM
      </h1>
      <input
        type="text"
        placeholder="Filtrar por región o nombre del plan"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="w-full p-3 mb-4 border border-gray-300 rounded-md text-base"
      />
      <div className="mb-4">
        <select
          onChange={handlePlanSelect}
          className="w-full p-3 border border-gray-300 rounded-md text-base"
        >
          <option value="">Selecciona un plan</option>
          {filteredPlans.map((plan) => (
            <option key={plan[0]} value={plan[0]}>
              {`${plan[5]} - ${plan[3]} (${plan[2]} días, ${
                plan[1] === "unlimited" ? "Datos ilimitados" : `${plan[1]} GB`
              })`}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-4 flex flex-col gap-2">
        {selectedPlans.map((item) => (
          <div
            key={item.plan[0]}
            className="flex items-center bg-gray-300 p-12 rounded text-sm"
          >
            <span className="flex-1">{`${item.plan[5]} - ${item.plan[2]} días`}</span>
            <div className="flex items-center mr-2">
            <ButtonDark
              onClick={() => handleQuantityChange(item.plan[0], item.quantity - 1)}
              extraClasses="p-8 text-sm"
              deactivated={item.quantity <= 1}
            >
              -
            </ButtonDark>
            <div className="p-8 bg-background rounded-custom mx-2 text-center">{item.quantity}</div>
            <ButtonDark
              onClick={() => handleQuantityChange(item.plan[0], item.quantity + 1)}
              extraClasses="p-8 text-sm"
            >
              +
            </ButtonDark>
          </div>
          <ButtonDark
            onClick={() => handleRemovePlan(item.plan[0])}
            extraClasses="p-8 text-sm"
          >
            Quitar plan
          </ButtonDark>
          </div>
        ))}
      </div>
      <button
        onClick={generateURL}
        className="w-full p-3 bg-blue-500 text-white border-none rounded cursor-pointer text-base mb-4"
      >
        Generar URL
      </button>
      {url && (
        <div>
          <h2 className="text-xl font-semibold mb-2">URL generada:</h2>
          <div className="flex flex-col gap-2 mb-2">
            <input
              ref={urlInputRef}
              type="text"
              value={url}
              readOnly
              className="w-full p-3 border border-gray-300 rounded text-sm"
            />
            <button
              onClick={copyToClipboard}
              className="p-3 bg-green-500 text-white border-none rounded cursor-pointer text-base"
            >
              Copiar
            </button>
          </div>
          {copySuccess && (
            <p
              className={`m-0 text-sm ${
                copySuccess.includes("Error") ? "text-red-500" : "text-green-500"
              }`}
            >
              {copySuccess}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default URLGenerator;