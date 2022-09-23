import { useEffect, useState } from "react";
import { useMoralis } from "react-moralis";
import KYCModal from "../modals/KYCModal";

export default function ApplicationTable() {
  const { Moralis, enableWeb3, isWeb3Enabled } = useMoralis();

  //   Component States
  const [approved, setApproved] = useState(false);
  const [openApplication, setOpenApplication] = useState();
  const [KYCList, setKYCList] = useState([]);

  const openKYCApp = async () => {
    if (!openApplication) setOpenApplication(true);
    else {
      setOpenApplication(false);
    }
  };

  useEffect(() => {
    if (!isWeb3Enabled) enableWeb3();
    const ApprovedTable = Moralis.Object.extend("ApprovedTable");
    const query = new Moralis.Query(ApprovedTable);
    query.find().then((results) => {
      console.log(results);
      let l = [];
      results.forEach((result) => {
        l.push({
          id: result.id,
          name: result.get("firstName") + " " + result.get("lastName"),
          email: result.get("emailAddress"),
          dateOfBirth: result.get("dateOfBirth"),
          address: result.get("streetAddress"),
          city: result.get("city"),
          file: result.get("birthCertificate"),
        });
      });
      setKYCList(l);
    });
  }, []);

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold text-gray-900">
            KYC Applications
          </h1>
          <p className="mt-2 text-sm text-gray-700">
            A list of all the users applying for KYC including their name,
            title, email and kyc file.
          </p>
        </div>
      </div>
      {openApplication && <KYCModal KYCList={KYCList} />}
      <div className="-mx-4 mt-8 overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:-mx-6 md:mx-0 md:rounded-lg">
        <table className="min-w-full divide-y divide-gray-300">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
              >
                Name
              </th>
              <th
                scope="col"
                className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell"
              >
                Email
              </th>

              <th
                scope="col"
                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
              >
                Status
              </th>
              <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                <span className="sr-only">Edit</span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {KYCList.map((kyc, index) => (
              <tr key={index}>
                <td className="w-full max-w-0 py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:w-auto sm:max-w-none sm:pl-6">
                  {kyc.name}
                  <dl className="font-normal lg:hidden">
                    <dt className="sr-only">Title</dt>
                    <dd className="mt-1 truncate text-gray-700">{kyc.title}</dd>
                    <dt className="sr-only sm:hidden">Email</dt>
                    <dd className="mt-1 truncate text-gray-500 sm:hidden">
                      {kyc.email}
                    </dd>
                  </dl>
                </td>
                <td className="hidden px-3 py-4 text-sm text-gray-500 sm:table-cell">
                  {kyc.email}
                </td>

                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                  <span
                    className={`inline-flex rounded-full bg-green-100 px-2 text-xs ${
                      !approved && "bg-orange-200"
                    } "font-semibold leading-5 text-green-800"`}
                  >
                    {approved ? "Approved" : "Pending"}
                  </span>
                </td>
                <td className="py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                  <button
                    onClick={openKYCApp}
                    className="text-indigo-600 hover:text-indigo-900"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
