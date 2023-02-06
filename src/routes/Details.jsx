import { useQuery } from "@tanstack/react-query";
import { lazy, useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import AdoptedPetContext from "../AdoptedPetContext";

import Carousel from "../Carousel";
import ErrorBoundary from "../ErrorBoundary";
import Spinner from "../Spinner";

import fetchPet from "../fetchPet";

const Modal = lazy(() => import("../Modal"));

const Details = () => {
  const { id } = useParams();
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const { isLoading, data } = useQuery(["details", id], fetchPet);
  const [, setAdoptedPet] = useContext(AdoptedPetContext);

  if (isLoading) {
    return <Spinner />;
  }

  const pet = data.pets[0];

  return (
    <div className="details">
      <Carousel images={pet.images} />
      <div>
        <h1>{pet.name}</h1>
        <h2>{`${pet.animal} — ${pet.breed} — ${pet.city}, ${pet.state}`}</h2>
        <button onClick={() => setShowModal(true)}>Adopt {pet.name}</button>
        <p>{pet.description}</p>
        {showModal ? (
          <Modal>
            <div>
              <h1>Would you like to adopt {pet.name}?</h1>
              <div className="buttons">
                <button
                  onClick={() => {
                    setAdoptedPet(pet);
                    navigate("/");
                  }}
                >
                  Yes
                </button>
                <button onClick={() => setShowModal(false)}>No</button>
              </div>
            </div>
          </Modal>
        ) : null}
      </div>
    </div>
  );
};

export default function DetailsErrorBoundary() {
  return (
    <ErrorBoundary>
      <Details />
    </ErrorBoundary>
  );
}
