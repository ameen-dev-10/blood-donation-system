import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

// reactstrap components
import {
  Button,
  Card,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col,
} from "reactstrap";
// layout for this page
import Auth from "layouts/Auth.js";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { userLogin } from "../../store/authSlice";

function Register() {
  const bloodGroups = ["O-", "O+", "A-", "A+", "B-", "B+", "AB-", "AB+"];

  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [password, setPassword] = useState(user?.password || "");
  const [address, setAddress] = useState(user?.address || "");
  const [DOB, setDOB] = useState(user?.dob?.split("T")[0] || "");
  const [age, setAge] = useState(user?.age || null);
  const [bloodGroup, setBloodGroup] = useState(user?.blood_group || "");
  const [gender, setGender] = useState(user?.gender || "");
  const [location, setLocation] = useState(
    user?.location || {
      type: "Point",
      coordinates: [],
    }
  );

  const router = useRouter();

  useEffect(() => {
    if (navigator.geolocation && !location.coordinates.length) {
      navigator.geolocation.getCurrentPosition(function (position) {
        let lat = position.coords.latitude;
        let long = position.coords.longitude;

        const updatedLocation = { ...location, coordinates: [lat, long] };
        setLocation(updatedLocation);
      });
    }
  }, []);

  async function submitHandler(e) {
    e.preventDefault();
    const url = `${window.location.origin}/api/register`;
    const method = user?.name ? "put" : "post";

    const payload = {
      name,
      email,
      password,
      address,
      location,
      gender,
      dob: DOB,
      age,
      blood_group: bloodGroup,
      role: user?.name ? "DONOR" : "USER",
    };

    const axiosConfig = {
      url,
      method,
      data: payload,
    };

    if (user?._id) payload._id = user?._id;

    try {
      const { data } = await axios(axiosConfig);
      if (user?._id) {
        dispatch(userLogin(data?.data));
        return router.push("/admin/dashboard");
      }

      router.push("/auth/login");
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <>
      <Col lg="6" md="8">
        <Card className="bg-secondary shadow border-0">
          <CardBody className="px-lg-5 py-lg-5">
            <h1 className="text-center mb-4">Register Account</h1>
            <Form onSubmit={submitHandler} role="form">
              <FormGroup>
                <InputGroup className="input-group-alternative mb-3">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-hat-3" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    required
                    placeholder="Name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative mb-3">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-email-83" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    required
                    placeholder="Email"
                    type="email"
                    autoComplete="new-email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-lock-circle-open" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    required
                    placeholder="Password"
                    type="password"
                    autoComplete="new-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-lock-circle-open" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    required
                    placeholder="Enter your Age"
                    type="number"
                    autoComplete="new-age"
                    value={age}
                    onChange={(e) => setAge(+e.target.value)}
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-lock-circle-open" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    required
                    placeholder="Enter your Date of Birth"
                    type="date"
                    autoComplete="new-date"
                    value={DOB}
                    onChange={(e) => setDOB(e.target.value)}
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-pin-3" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    required
                    placeholder="Address"
                    type="text"
                    autoComplete="new-Address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </InputGroup>
              </FormGroup>
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
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                  >
                    <option value="" selected>
                      Select Your Gender
                    </option>
                    <option value={"Male"}>Male</option>
                    <option value={"Female"}>Female</option>
                    <option value={"Others"}>Others</option>
                  </Input>
                </InputGroup>
              </FormGroup>
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
                      value={bloodGroup}
                      onChange={(e) => setBloodGroup(e.target.value)}
                    >
                      <option value="" selected>
                        Select Your Blood Group
                      </option>
                      {bloodGroups.map((group) => (
                        <option key={group} value={group} selected>
                          {group}
                        </option>
                      ))}
                    </Input>
                  </InputGroup>
                </FormGroup>
              )}
              <Row className="my-4">
                <Col xs="12">
                  <div className="custom-control custom-control-alternative custom-checkbox">
                    <input
                      className="custom-control-input"
                      id="customCheckRegister"
                      type="checkbox"
                    />
                    <label
                      className="custom-control-label"
                      htmlFor="customCheckRegister"
                    >
                      <span className="text-muted">
                        I agree with the{" "}
                        <a href="#pablo" onClick={(e) => e.preventDefault()}>
                          Privacy Policy
                        </a>
                      </span>
                    </label>
                  </div>
                </Col>
              </Row>
              <div className="text-center">
                <Button className="mt-4" color="primary" type="submit">
                  {user?.name ? "Register" : "Create account"}
                </Button>
              </div>
            </Form>
          </CardBody>
        </Card>
      </Col>
    </>
  );
}

Register.layout = Auth;

export default Register;
