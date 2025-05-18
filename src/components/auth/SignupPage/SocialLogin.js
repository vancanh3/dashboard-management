import React from "react";
import { Button } from "reactstrap";
import {
  faFacebook,
  faTwitter,
  faGoogle,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const SocialLogin = () => {
  return (
    <div className="text-center mt-4">
      <Button color="link" className="text-primary mx-1">
        <FontAwesomeIcon icon={faFacebook} />
      </Button>
      <Button color="link" className="text-info mx-1">
        <FontAwesomeIcon icon={faTwitter} />
      </Button>
      <Button color="link" className="text-danger mx-1">
        <FontAwesomeIcon icon={faGoogle} />
      </Button>
      <Button color="link" className="text-dark mx-1">
        <FontAwesomeIcon icon={faGithub} />
      </Button>
    </div>
  );
}; 