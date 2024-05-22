import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Avatar,
  Chip,
  Tooltip,
  Progress,
  Button,
  Input,
} from "@material-tailwind/react";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import { authorsTableData, projectsTableData } from "@/data";
import { useState } from "react";

export function Tables() {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  }

  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <Card>
        <CardHeader variant="gradient" color="gray" className="mb-8 p-6">
          <Typography variant="h6" color="white">
            Liquid intake table
          </Typography>
        </CardHeader>
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">

          <div className="mr-auto md:mr-4 md:w-56 ml-4 mb-2 mt-3">
            <Input label="Search Patient ID" />
          </div>
          <table className="w-full min-w-[640px] table-auto">
            <thead>
              <tr>
                {["Patient ID", "Consumption", "Volume", "Time of Consumption", "edit", "remove"].map((el) => (
                  <th
                    key={el}
                    className="border-b border-blue-gray-50 py-3 px-5 text-left"
                  >
                    <Typography
                      variant="small"
                      className="text-[11px] font-bold uppercase text-blue-gray-400"
                    >
                      {el}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {authorsTableData.map(
                ({ patientId, consumption, volume, time }, key) => {
                  const className = `py-3 px-5 ${
                    key === authorsTableData.length - 1
                      ? ""
                      : "border-b border-blue-gray-50"
                  }`;

                  return (
                    <tr key={patientId}>
                      <td className={className}>
                        <div className="flex items-center gap-4">
                          <div>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-semibold"
                            >
                              {patientId}
                            </Typography>
                            {/* <Typography className="text-xs font-normal text-blue-gray-500">
                              {email}
                            </Typography> */}
                          </div>
                        </div>
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          {consumption}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          {volume} mL
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          {time}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography
                          as="a"
                          href="#"
                          className="text-xs font-semibold text-blue-600"
                        >
                          Edit
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography
                          as="a"
                          href="#"
                          className="text-xs font-semibold text-red-600"
                        >
                          Remove
                        </Typography>
                      </td>
                    </tr>
                  );
                }
              )}
            </tbody>
          </table>
        </CardBody>
      </Card>

          <Button className="bg-blue-700" fullWidth onClick={toggleModal}>
            Add Liquid Intake
          </Button>



          {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
            <Typography variant="h5" className="mb-4">
              Add Liquid Intake
            </Typography>
            <form className="mt-8 mb-2">
              <div className="mb-4 flex flex-col gap-6">
                <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
                  Patient ID
                </Typography>
                <Input
                  size="lg"
                  placeholder="Enter Patient ID"
                  className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                />
                <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
                  Consumption
                </Typography>
                <Input
                  size="lg"
                  placeholder="Enter Consumption"
                  className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                />
                <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
                  Volume (mL)
                </Typography>
                <Input
                  size="lg"
                  placeholder="Enter Volume in mL"
                  className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                />
              </div>
              <div className="flex justify-end gap-4">
                <Button color="red" onClick={toggleModal}>
                  Cancel
                </Button>
                <Button type="submit" className="bg-blue-700">
                  Add
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Tables;
