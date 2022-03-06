/* eslint-disable react/prop-types */
// @mui material components
// import Tooltip from "@mui/material/Tooltip";
import axios from "axios";
import { useEffect, useState } from "react";

// Soft UI Dashboard React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
// import MDBadge from "components/MDBadge";

function getMajorString(majorList) {
  let majors = "";
  // eslint-disable-next-line array-callback-return
  majorList.map((major) => {
    // eslint-disable-next-line eqeqeq
    if (majors != "") {
      majors = `${majors}, ${major}`;
    } else {
      majors = major;
    }
  });

  return majors;
}
export default function data() {
  const [mentor, setMentor] = useState([]);
  useEffect(() => {
    axios
      .get("https://theweekendexpertise.azurewebsites.net/api/v1/mentors")
      .then((res) => {
        const mentors = res.data;
        // eslint-disable-next-line array-callback-return
        mentors.map((item) => {
          // eslint-disable-next-line no-param-reassign
          item.listMajor = getMajorString(item.listMajor);
          const day = item.birthday.split(" ")[0];
          // eslint-disable-next-line no-param-reassign
          item.birthday = day;
        });
        setMentor(mentors);
      })
      .catch((error) => console.log(error));
  }, []);
  // const avatars = (members) =>
  //   members.map(([image, name]) => (
  //     <Tooltip key={name} title={name} placeholder="bottom">
  //       <MDAvatar
  //         src={image}
  //         alt="name"
  //         size="xs"
  //         sx={{
  //           border: ({ borders: { borderWidth }, palette: { white } }) =>
  //             `${borderWidth[2]} solid ${white.main}`,
  //           cursor: "pointer",
  //           position: "relative",

  //           "&:not(:first-of-type)": {
  //             ml: -1.25,
  //           },

  //           "&:hover, &:focus": {
  //             zIndex: "10",
  //           },
  //         }}
  //       />
  //     </Tooltip>
  //   ));

  // const Group = ({ image, name }) => (
  //   <MDBox display="flex" alignItems="center" lineHeight={1}>
  //     <MDAvatar src={image} name={name} size="sm" />
  //     <MDTypography variant="button" fontWeight="medium" ml={1} lineHeight={1}>
  //       {name}
  //     </MDTypography>
  //   </MDBox>
  // );

  const Mentor = ({ image, name, email }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDAvatar src={image} name={name} size="sm" />
      <MDBox ml={2} lineHeight={1}>
        <MDTypography display="block" variant="button" fontWeight="medium">
          {name}
        </MDTypography>
        <MDTypography variant="caption">{email}</MDTypography>
      </MDBox>
    </MDBox>
  );

  function dataTable() {
    return mentor.map((item) => ({
      stt: (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          1
        </MDTypography>
      ),
      session: (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          1
        </MDTypography>
      ),
      mentor: <Mentor image={item.image} name={item.fullname} />,
      members: (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          Very good
        </MDTypography>
      ),
      date_time: (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          Very good
        </MDTypography>
      ),
      status: (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          Very good
        </MDTypography>
      ),
    }));
  }
  return {
    columns: [
      { Header: "STT", accessor: "stt", align: "left" },
      { Header: "session", accessor: "session", width: "15%", align: "left" },
      { Header: "members", accessor: "members", width: "25%", align: "left" },
      { Header: "mentor", accessor: "mentor", align: "center" },
      { Header: "date/time", accessor: "date_time", align: "center" },
      { Header: "status", accessor: "status", align: "center" },
    ],

    rows: dataTable(),
  };
}
