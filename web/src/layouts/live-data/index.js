import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";


// Data

import { useEffect, useState, useContext ,useLayoutEffect} from "react";
import DataTable from "examples/Tables/DataTable";
import MDProgress from "components/MDProgress";
import { TextField } from "@mui/material";
import { StateContext } from "store/store";
import { Chart } from "react-google-charts";

import State from "./state";
import config from "config";







function LiveData() {
    const { batchList,ageDistro } = useContext(StateContext)
    const [data2, setdata2] = useState([])
    const data = [
        ["Name", "Disbursement by state"],
            ["abia",10],
            ["adamawa",10],
            ["akwa Ibom",10],
            ["anambra",10],
            ["bauchi",10],
            ["bayelsa",10],
            ["benue",10],
            ["borno",10],
            ["cross River",10],
            ["delta",10],
            ["ebonyi",10],
            ["edo",10],
            ["ekiti",10],
            ["enugu",10],
            ["abuja",10],
            ["gombe",10],
            ["imo",10],
            ["jigawa",10],
            ["kaduna",10],
            ["kano",10],
            ["katsina",10],
            ["kebbi",10],
            ["kogi",10],
            ["kwara",10],
            ["lagos",10],
            ["nasarawa",10],
            ["niger",10],
            ["ogun",10],
            ["ondo",10],
            ["osun",10],
            ["oyo",10],
            ["plateau",10],
            ["rivers",5000],
            ["sokoto",10],
            ["taraba",10],
            ["yobe",10],
            ["zamfara",10000]
    ];
    const fetchStats =()=>{
        fetch(`${config.EndPionts}/analytics`).
        then(res=>(res.json())).
        then(response=>{
            setdata2([["Name", "Disbursement by gender"],["Male",response.male],["Female",response.female]])
        })
    }

   
    const columns = [
        { Header: "companies", accessor: "companies", align: "left" },
        { Header: "Number State", accessor: "state", align: "left" },
        { Header: "Number Beneficiaries", accessor: "beneficiaries", align: "left" },
        { Header: "Disbursement", accessor: "disbursement", align: "center" },
        { Header: "Total Payment", accessor: "payment", align: "center" },
        { Header: "completion", accessor: "completion", width: "20%", align: "center" },
    ]

    const rows = [
        {
            companies: <MDTypography variant="caption" color="text" fontWeight="medium">company Name</MDTypography>,
            state: (<MDTypography variant="caption" color="text" fontWeight="medium">11</MDTypography>),
            beneficiaries: (<MDTypography variant="caption" color="text" fontWeight="medium">2,400</MDTypography>),
            disbursement: (
                <MDTypography variant="caption" color="text" fontWeight="medium">
                    $14,000
                </MDTypography>
            ),
            payment: (<MDTypography variant="caption" color="text" fontWeight="medium">2,400</MDTypography>),
            completion: (
                <MDBox width="8rem" textAlign="left">
                    <a>50%</a>
                    <MDProgress value={60} color="info" variant="gradient" label={false} />
                </MDBox>
            )

        },
    ]
  useLayoutEffect(() => {
    fetchStats()
  }, [])
    return (
        <DashboardLayout>
            <DashboardNavbar />
            <MDBox pt={6} pb={3}>
                <Grid item xs={12} md={6} lg={12}>
                    <Card>
                        <MDBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
                            <Grid container sx={{ justifyContent: "center", gap: 3 }} >
                                <TextField
                                    select
                                    label="Batch"
                                    sx={{ width: 100 }}
                                    value={1}
                                    // onChange={(e) => setbatch(e.target.value)}
                                    SelectProps={{
                                        native: true,
                                    }}
                                    size='small'
                                >
                                    {batchList.map((option) => (
                                        <option key={option.value} value={option.value}>
                                            {option.code}
                                        </option>
                                    ))}
                                </TextField>
                                <TextField
                                    select
                                    label="Company"
                                    sx={{ width: 100 }}
                                    value={1}
                                    // onChange={(e) => setbatch(e.target.value)}
                                    SelectProps={{
                                        native: true,
                                    }}
                                    size='small'
                                >
                                    {/* {batchList.map((option) => (
                                                <option key={option.value} value={option.value}>
                                                    {option.code}
                                                </option>
                                            ))} */}
                                </TextField>
                                <TextField
                                    select
                                    label="Completion"
                                    sx={{ width: 100 }}
                                    value={1}
                                    // onChange={(e) => setbatch(e.target.value)}
                                    SelectProps={{
                                        native: true,
                                    }}
                                    size='small'
                                >
                                    {/* {batchList.map((option) => (
                                                <option key={option.value} value={option.value}>
                                                    {option.code}
                                                </option>
                                            ))} */}
                                </TextField>
                                <TextField
                                    select
                                    label="No of Beneficiaries"
                                    sx={{ width: 100 }}
                                    value={1}
                                    // onChange={(e) => setstate(e.target.value)}
                                    SelectProps={{
                                        native: true,
                                    }}
                                    size='small'
                                >
                                    {/* {[].map((option) => (
                                                <option key={option} value={option}>
                                                    {option}
                                                </option>
                                            ))}  */}
                                </TextField>
                                <TextField sx={{ width: 200, ml: 4 }} placeholder="Name Phone BVN NIN" size="small" label="Search" />
                            </Grid>
                        </MDBox>
                        <MDBox>
                            <DataTable
                                table={{ columns, rows }}
                                showTotalEntries={false}
                                isSorted={false}
                                noEndBorder
                                entriesPerPage={false}
                            />
                        </MDBox>
                    </Card>
                    <State />
                </Grid>
                <Grid container >
                    <Chart
                        chartType="BarChart"
                        width="100%"
                        height="400px"
                        data={data}
                        chartPackages={["corechart", "controls"]}
                        controls={[
                            {
                                controlType: "CategoryFilter",
                                options: {
                                    filterColumnIndex: 0,
                                    matchType: "any", // 'prefix' | 'exact',
                                    ui: {
                                        label: "Search by State",
                                    },
                                },
                            },
                        ]}
                    />
                    <Grid container flexWrap="nowrap" >
                    <Chart
                        chartType="PieChart"
                        data={data}
                        options={{title: "State Distribution"}}
                        width={"475px"}
                        height={"400px"}
                    />
                     <Chart
                        chartType="PieChart"
                        data={data2}
                        options={{title: "Gender Distribution"}}
                        width={"475px"}
                        height={"400px"}
                    />

                    </Grid>
                </Grid>
            </MDBox>
        </DashboardLayout>
    );
}
export default LiveData;
