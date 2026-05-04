import { useMemo, useState } from "react";
import ManagementHeader from "../components/Management/ManagementHeader";
import ManagementFilters from "../components/Management/ManagementFilters";
import ComplaintTable from "../components/Management/ComplaintTable";

const complaints = [
  {
    title: "Street light failure at Main Road",
    desc: "Electrical pole #42 is flickering.",
    area: "Downtown Sector 4",
    mobile: "+1 555-0101",
    category: "Infrastructure",
    priority: "High",
    status: "Pending",
    date: "Oct 24, 2023",
  },
  {
    title: "Garbage overflow near park",
    desc: "Trash collection missed twice.",
    area: "Riverside Heights",
    mobile: "+1 555-0199",
    category: "Sanitation",
    priority: "Medium",
    status: "In Progress",
    date: "Oct 23, 2023",
  },
  {
    title: "Pot hole on Highway 9",
    desc: "Large gap causing traffic jams.",
    area: "Outer Beltway",
    mobile: "+1 555-0245",
    category: "Public Works",
    priority: "High",
    status: "Resolved",
    date: "Oct 22, 2023",
  },
  {
    title: "Water leakage at Plaza",
    desc: "Main pipe leak reported by guard.",
    area: "Central Plaza",
    mobile: "+1 555-0312",
    category: "Water Supply",
    priority: "Medium",
    status: "Pending",
    date: "Oct 22, 2023",
  },
  {
    title: "Park bench vandalized",
    desc: "Graffiti on multiple benches.",
    area: "Greenway Park",
    mobile: "+1 555-0442",
    category: "Public Safety",
    priority: "Low",
    status: "In Progress",
    date: "Oct 21, 2023",
  },
  {
    title: "Broken drainage cover",
    desc: "Open drain cover causing danger.",
    area: "Lake View Colony",
    mobile: "+1 555-0521",
    category: "Infrastructure",
    priority: "High",
    status: "Pending",
    date: "Oct 20, 2023",
  },
  {
    title: "Low water pressure",
    desc: "Water pressure very low since morning.",
    area: "North Avenue",
    mobile: "+1 555-0632",
    category: "Water Supply",
    priority: "Medium",
    status: "Resolved",
    date: "Oct 19, 2023",
  },
  {
    title: "Illegal dumping",
    desc: "Construction waste dumped roadside.",
    area: "Industrial Zone",
    mobile: "+1 555-0743",
    category: "Sanitation",
    priority: "High",
    status: "Rejected",
    date: "Oct 18, 2023",
  },
  {
    title: "Traffic signal not working",
    desc: "Signal lights are completely off.",
    area: "MG Road Crossing",
    mobile: "+1 555-0811",
    category: "Public Safety",
    priority: "High",
    status: "In Progress",
    date: "Oct 17, 2023",
  },
  {
    title: "Roadside tree fallen",
    desc: "Tree blocking half of the road.",
    area: "Hill Top Area",
    mobile: "+1 555-0922",
    category: "Public Works",
    priority: "Medium",
    status: "Pending",
    date: "Oct 16, 2023",
  },
  {
    title: "Sewage smell in street",
    desc: "Bad smell due to blocked sewage.",
    area: "Old City Ward 2",
    mobile: "+1 555-1033",
    category: "Sanitation",
    priority: "Medium",
    status: "Pending",
    date: "Oct 15, 2023",
  },
  {
    title: "Damaged footpath",
    desc: "Footpath tiles are broken.",
    area: "Market Street",
    mobile: "+1 555-1144",
    category: "Public Works",
    priority: "Low",
    status: "Resolved",
    date: "Oct 14, 2023",
  },
  {
    title: "No street cleaning",
    desc: "Street not cleaned for 3 days.",
    area: "Sunrise Colony",
    mobile: "+1 555-1255",
    category: "Sanitation",
    priority: "Low",
    status: "In Progress",
    date: "Oct 13, 2023",
  },
  {
    title: "Water tanker delay",
    desc: "Scheduled water tanker not arrived.",
    area: "Sector 9",
    mobile: "+1 555-1366",
    category: "Water Supply",
    priority: "High",
    status: "Pending",
    date: "Oct 12, 2023",
  },
  {
    title: "Open manhole",
    desc: "Manhole cover missing near school.",
    area: "School Road",
    mobile: "+1 555-1477",
    category: "Infrastructure",
    priority: "High",
    status: "In Progress",
    date: "Oct 11, 2023",
  },
  {
    title: "Noise complaint",
    desc: "Loud speaker running late night.",
    area: "Civil Lines",
    mobile: "+1 555-1588",
    category: "Public Safety",
    priority: "Medium",
    status: "Rejected",
    date: "Oct 10, 2023",
  },
  {
    title: "Pipeline burst",
    desc: "Heavy water flow on main road.",
    area: "Station Road",
    mobile: "+1 555-1699",
    category: "Water Supply",
    priority: "High",
    status: "Resolved",
    date: "Oct 09, 2023",
  },
  {
    title: "Garbage bin broken",
    desc: "Public garbage bin is damaged.",
    area: "City Center",
    mobile: "+1 555-1701",
    category: "Sanitation",
    priority: "Low",
    status: "Pending",
    date: "Oct 08, 2023",
  },
  {
    title: "Street dog issue",
    desc: "Aggressive dogs near residential area.",
    area: "Rose Garden",
    mobile: "+1 555-1812",
    category: "Public Safety",
    priority: "Medium",
    status: "In Progress",
    date: "Oct 07, 2023",
  },
  {
    title: "Road divider damaged",
    desc: "Divider blocks are broken.",
    area: "Airport Road",
    mobile: "+1 555-1923",
    category: "Public Works",
    priority: "Low",
    status: "Resolved",
    date: "Oct 06, 2023",
  },
  {
    title: "Street light pole tilted",
    desc: "Pole may fall during wind.",
    area: "New Market",
    mobile: "+1 555-2034",
    category: "Infrastructure",
    priority: "High",
    status: "Pending",
    date: "Oct 05, 2023",
  },
  {
    title: "Water contamination",
    desc: "Dirty water coming from tap.",
    area: "Shanti Nagar",
    mobile: "+1 555-2145",
    category: "Water Supply",
    priority: "High",
    status: "In Progress",
    date: "Oct 04, 2023",
  },
  {
    title: "Overflowing public toilet",
    desc: "Public toilet drainage blocked.",
    area: "Bus Stand",
    mobile: "+1 555-2256",
    category: "Sanitation",
    priority: "Medium",
    status: "Pending",
    date: "Oct 03, 2023",
  },
  {
    title: "Broken speed breaker",
    desc: "Speed breaker causing vehicle damage.",
    area: "College Road",
    mobile: "+1 555-2367",
    category: "Public Works",
    priority: "Low",
    status: "Rejected",
    date: "Oct 02, 2023",
  },
  {
    title: "Street camera not working",
    desc: "CCTV camera is offline.",
    area: "Police Chowki Area",
    mobile: "+1 555-2478",
    category: "Public Safety",
    priority: "High",
    status: "Resolved",
    date: "Oct 01, 2023",
  },
  {
    title: "Drain water on road",
    desc: "Drainage water spreading on road.",
    area: "Hanuman Nagar",
    mobile: "+1 555-2589",
    category: "Sanitation",
    priority: "Medium",
    status: "In Progress",
    date: "Sep 30, 2023",
  },
  {
    title: "Broken water valve",
    desc: "Valve leaking continuously.",
    area: "BHEL Township",
    mobile: "+1 555-2690",
    category: "Water Supply",
    priority: "Medium",
    status: "Pending",
    date: "Sep 29, 2023",
  },
  {
    title: "Damaged road sign",
    desc: "Road sign board has fallen.",
    area: "Ring Road",
    mobile: "+1 555-2701",
    category: "Infrastructure",
    priority: "Low",
    status: "Resolved",
    date: "Sep 28, 2023",
  },
  {
    title: "Public park lights off",
    desc: "Park lights not working at night.",
    area: "Children Park",
    mobile: "+1 555-2812",
    category: "Public Works",
    priority: "Medium",
    status: "Pending",
    date: "Sep 27, 2023",
  },
  {
    title: "Unsafe electric wire",
    desc: "Open wire hanging near house.",
    area: "Ashoka Garden",
    mobile: "+1 555-2923",
    category: "Infrastructure",
    priority: "High",
    status: "In Progress",
    date: "Sep 26, 2023",
  },
];

const ITEMS_PER_PAGE = 10;

const Management = () => {
  const [filters, setFilters] = useState({
    search: "",
    category: "",
    priority: "",
    status: "",
  });

  const [currentPage, setCurrentPage] = useState(1);

  const handleFilterChange = (callback) => {
    setFilters(callback);
    setCurrentPage(1);
  };

  const filteredComplaints = useMemo(() => {
    return complaints.filter((item) => {
      const searchValue = filters.search.toLowerCase();

      const matchSearch =
        item.title.toLowerCase().includes(searchValue) ||
        item.area.toLowerCase().includes(searchValue) ||
        item.mobile.toLowerCase().includes(searchValue);

      const matchCategory = filters.category
        ? item.category === filters.category
        : true;

      const matchPriority = filters.priority
        ? item.priority === filters.priority
        : true;

      const matchStatus = filters.status
        ? item.status === filters.status
        : true;

      return matchSearch && matchCategory && matchPriority && matchStatus;
    });
  }, [filters]);

  const totalPages = Math.ceil(filteredComplaints.length / ITEMS_PER_PAGE);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedComplaints = filteredComplaints.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  return (
    <div className="min-h-screen bg-white px-4 py-6 md:px-8">
      <div className="mx-auto max-w-7xl">
        <ManagementHeader />

        <ManagementFilters
          filters={filters}
          setFilters={handleFilterChange}
        />

        <ComplaintTable
          complaints={paginatedComplaints}
          totalItems={filteredComplaints.length}
          currentPage={currentPage}
          totalPages={totalPages}
          itemsPerPage={ITEMS_PER_PAGE}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default Management;
