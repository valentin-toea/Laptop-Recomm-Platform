import { useEffect, useState } from "react";
import { Laptop } from "../types";
import {
  getGamingLaptops,
  getGraficLaptops,
  getOfficeLaptops,
  getRecommendedItems,
  getStudentLaptops,
} from "../actions/item-actions";

export const useGetCategories = () => {
  const [gamingLaptops, setGamingLaptops] = useState<Laptop[]>([]);
  const [studentLaptops, setStudentLaptops] = useState<Laptop[]>([]);
  const [powerLaptops, setPowerLaptops] = useState<Laptop[]>([]);
  const [officeLaptops, setOfficeLaptops] = useState<Laptop[]>([]);

  useEffect(() => {
    (async () => {
      const items = await getGamingLaptops();
      setGamingLaptops(items);

      const studentItems = await getStudentLaptops();
      setStudentLaptops(studentItems);

      const powerItems = await getGraficLaptops();
      setPowerLaptops(powerItems);

      const officeItems = await getOfficeLaptops();
      setOfficeLaptops(officeItems);
    })();
  }, []);

  return { gamingLaptops, studentLaptops, powerLaptops, officeLaptops };
};
