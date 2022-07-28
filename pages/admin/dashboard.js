import React, { useEffect, useState } from "react";
// node.js library that concatenates classes (strings)
import classnames from "classnames";
// javascipt plugin for creating charts
import Chart from "chart.js";
// react plugin used to create charts
import { Line, Bar } from "react-chartjs-2";
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  NavItem,
  NavLink,
  Nav,
  Progress,
  Table,
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Input,
} from "reactstrap";
// layout for this page
import Admin from "layouts/Admin.js";
// core components
import {
  chartOptions,
  parseOptions,
  chartExample1,
  chartExample2,
} from "variables/charts.js";

import Header from "components/Headers/Header.js";
import axios from "axios";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

const Dashboard = ({ data }) => {
  const { user } = useSelector((state) => state.auth);
  const [donor, setDonors] = useState(data?.data);

  const router = useRouter();
  const bloodGroups = ["O-", "O+", "A-", "A+", "B-", "B+", "AB-", "AB+"];

  useEffect(() => {
    if (!user?.name) router.push("/auth/login");
  }, []);

  console.log({ router });

  async function getDonors(bloodGroup) {
    if (!bloodGroup) return setDonors(data?.data);
    const url = `${window.location.origin}/api/donor`;

    const { coordinates } = user.location;
    const payload = {
      coordinates,
      bloodGroup,
    };
    try {
      const response = await axios.post(url, payload);
      setDonors(response.data.data);
    } catch (error) {
      console.log(error.message);
    }
  }

  // client side data filter
  {
    // useEffect(() => {
    //   const timeout = setTimeout(bgFilterHandler, 100);
    //   return () => {
    //     clearTimeout(timeout);
    //   };
    // }, [bloodGroup]);
    // function bgFilterHandler(e) {
    //   if (!bloodGroups.includes(bloodGroup)) return setUsers(data?.data);
    //   let donorsGroup = [];
    //   switch (bloodGroup) {
    //     case "O-":
    //       donorsGroup = ["O-"];
    //       break;
    //     case "O+":
    //       donorsGroup = ["O-", "O+"];
    //       break;
    //     case "A-":
    //       donorsGroup = ["O-", "A-"];
    //       break;
    //     case "B-":
    //       donorsGroup = ["O-", "B-"];
    //       break;
    //     case "A+":
    //       donorsGroup = ["O-", "O+", "A-", "A+"];
    //       break;
    //     case "B+":
    //       donorsGroup = ["O-", "O+", "B-", "B+"];
    //       break;
    //     case "AB-":
    //       donorsGroup = ["O-", "A-", "B-", "AB-"];
    //       break;
    //     case "AB+":
    //       donorsGroup = ["O-", "O+", "A-", "A+", "B-", "B+", "AB-", "AB+"];
    //       break;
    //   }
    //   const updatedUsers = data?.data.filter(
    //     (user) => donorsGroup.includes(user.blood_group) && user.isLogin
    //   );
    //   setUsers(updatedUsers);
    // }
  }

  if (window.Chart) {
    parseOptions(Chart, chartOptions());
  }

  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid>
        {/* <Row>
          <Col className="mb-5 mb-xl-0" xl="8">
            <Card className="shadow">
              <CardHeader className="bg-transparent">
                <Row className="align-items-center">
                  <div className="col">
                    <h6 className="text-uppercase text-light ls-1 mb-1">
                      Overview
                    </h6>
                    <h2 className="text-white mb-0">Sales value</h2>
                  </div>
                  <div className="col">
                    <Nav className="justify-content-end" pills>
                      <NavItem>
                        <NavLink
                          className={classnames("py-2 px-3", {
                            active: activeNav === 1,
                          })}
                          href="#pablo"
                          onClick={(e) => toggleNavs(e, 1)}
                        >
                          <span className="d-none d-md-block">Month</span>
                          <span className="d-md-none">M</span>
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink
                          className={classnames("py-2 px-3", {
                            active: activeNav === 2,
                          })}
                          data-toggle="tab"
                          href="#pablo"
                          onClick={(e) => toggleNavs(e, 2)}
                        >
                          <span className="d-none d-md-block">Week</span>
                          <span className="d-md-none">W</span>
                        </NavLink>
                      </NavItem>
                    </Nav>
                  </div>
                </Row>
              </CardHeader>
              <CardBody>
                <div className="chart">
                  <Line
                    data={chartExample1[chartExample1Data]}
                    options={chartExample1.options}
                    getDatasetAtEvent={(e) => console.log(e)}
                  />
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col xl="4">
            <Card className="shadow">
              <CardHeader className="bg-transparent">
                <Row className="align-items-center">
                  <div className="col">
                    <h6 className="text-uppercase text-muted ls-1 mb-1">
                      Performance
                    </h6>
                    <h2 className="mb-0">Total orders</h2>
                  </div>
                </Row>
              </CardHeader>
              <CardBody>
                <div className="chart">
                  <Bar
                    data={chartExample2.data}
                    options={chartExample2.options}
                  />
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row> */}
        <Row className="mt-5">
          <Col className="mb-5 mb-xl-0" xl="12">
            <Card className="shadow">
              <CardHeader className="border-0">
                <Row className="align-items-center ">
                  <div className="col">
                    <h3 className="mb-0">Donor Details</h3>
                  </div>
                  {true && (
                    <FormGroup>
                      <InputGroup className="input-group-alternative">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="ni ni-pin-3" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          required
                          placeholder="Select Your Blood Group"
                          type="select"
                          autoComplete="new-Blood-Group"
                          // value={bloodGroup}
                          onChange={(e) => getDonors(e.target.value)}
                        >
                          <option value="" selected>
                            Select Your Blood Group
                          </option>
                          {bloodGroups.map((group) => (
                            <option key={group} value={group}>
                              {group}
                            </option>
                          ))}
                        </Input>
                      </InputGroup>
                    </FormGroup>
                  )}

                  {/* <Form className="navbar-search  form-inline mr-3 d-none d-md-flex ml-lg-auto">
                    <FormGroup className="mb-0">
                      <InputGroup className="input-group-alternative">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="fas fa-search" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          onChange={(e) => setSearch(e.target.value)}
                          placeholder="Enter Recepient Blood Group, ( A+, AB+ ... )"
                          type="text"
                        />
                      </InputGroup>
                    </FormGroup>
                  </Form> */}

                  {/* <div className="col text-right">
                    <Button
                      color="primary"
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                      size="sm"
                    >
                      See all
                    </Button>
                  </div> */}
                </Row>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Donor Name</th>
                    <th className="text-center" scope="col">
                      Age
                    </th>
                    <th className="text-center" scope="col">
                      Date of Birth
                    </th>
                    <th className="text-center" scope="col">
                      Address
                    </th>
                    <th className="text-center" scope="col">
                      Blood Group
                    </th>
                    <th className="text-right" scope="col">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {donor?.map((user) => (
                    <tr key={user._id}>
                      <th>{user?.name}</th>
                      <th className="text-center">{user?.age}</th>
                      <th className="text-center">{user?.dob.split("T")[0]}</th>
                      <td className="text-center">{user?.address}</td>
                      <td className="text-center">{user?.blood_group}</td>
                      <td className="text-right">
                        {user?.isLogin ? "Online" : "Offline"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card>
          </Col>
          {/* <Col xl="4">
            <Card className="shadow">
              <CardHeader className="border-0">
                <Row className="align-items-center">
                  <div className="col">
                    <h3 className="mb-0">Social traffic</h3>
                  </div>
                  <div className="col text-right">
                    <Button
                      color="primary"
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                      size="sm"
                    >
                      See all
                    </Button>
                  </div>
                </Row>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Referral</th>
                    <th scope="col">Visitors</th>
                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">Facebook</th>
                    <td>1,480</td>
                    <td>
                      <div className="d-flex align-items-center">
                        <span className="mr-2">60%</span>
                        <div>
                          <Progress
                            max="100"
                            value="60"
                            barClassName="bg-gradient-danger"
                          />
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">Facebook</th>
                    <td>5,480</td>
                    <td>
                      <div className="d-flex align-items-center">
                        <span className="mr-2">70%</span>
                        <div>
                          <Progress
                            max="100"
                            value="70"
                            barClassName="bg-gradient-success"
                          />
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">Google</th>
                    <td>4,807</td>
                    <td>
                      <div className="d-flex align-items-center">
                        <span className="mr-2">80%</span>
                        <div>
                          <Progress max="100" value="80" />
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">Instagram</th>
                    <td>3,678</td>
                    <td>
                      <div className="d-flex align-items-center">
                        <span className="mr-2">75%</span>
                        <div>
                          <Progress
                            max="100"
                            value="75"
                            barClassName="bg-gradient-info"
                          />
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">twitter</th>
                    <td>2,645</td>
                    <td>
                      <div className="d-flex align-items-center">
                        <span className="mr-2">30%</span>
                        <div>
                          <Progress
                            max="100"
                            value="30"
                            barClassName="bg-gradient-warning"
                          />
                        </div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </Table>
            </Card>
          </Col> */}
        </Row>
      </Container>
    </>
  );
};

Dashboard.layout = Admin;

export default Dashboard;

export async function getServerSideProps() {
  // Fetch data from external API
  const res = await fetch(`${window.location.origin}/api/users`);
  const data = await res.json();

  // Pass data to the page via props
  return { props: { data } };
}
