import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { getSquadById } from "../../Services/";

const DetailSquadComponent = (props) => {
  const squadId = props.location.query;

  const [squadDetail, setSquadDetail] = useState({});

  useEffect(() => {
    getSquadById(squadId).then((data) => {
      setSquadDetail(data.data.data);
    });
  }, [squadId]);
  return <>{squadDetail.squads_name}</>;
};

export default withRouter(DetailSquadComponent);
