import React, {useEffect, useMemo, useRef, useState} from "react";
import Button from "@material-ui/core/Button";
import {Delete} from "@material-ui/icons";
import Icon from "@material-ui/core/Icon";
import {TransitionsModal} from "./TransitionsModal";
import {filterGreaterThan} from "./helper";
import {NumberRangeColumnFilter} from "./NumberRangeColumnFilter";
import {Styles} from "./table-styles";
import {SliderColumnFilter} from "./SliderColumnFilter";
import {Table} from "./Table";


filterGreaterThan.autoRemove = (val) => typeof val !== "number";

export const ReactTablePage = ({ tableData }) => {
  const columns = useMemo(
    () => [
      {
        Header: "Name",
        columns: [
          {
            Header: "Name",
            accessor: "name",
            aggregate: "count",
            Aggregated: ({ value }) => `${value} Names`,
          },
          {
            Header: "Full Name",
            accessor: "fullName",
            filter: "fuzzyText",
            aggregate: "uniqueCount",
            Aggregated: ({ value }) => `${value} Unique Names`,
          },
        ],
      },
      {
        Header: "Info",
        columns: [
          {
            Header: "Watchers",
            accessor: "watchers",
            Filter: SliderColumnFilter,
            filter: "equals",
            aggregate: "average",
            Aggregated: ({ value }) => `${value} (avg)`,
          },
          {
            Header: "Forks",
            accessor: "forks",
            Filter: NumberRangeColumnFilter,
            filter: "between",
            aggregate: "sum",
            Aggregated: ({ value }) => `${value} (total)`,
          },
          {
            Header: "Open Issues",
            accessor: "openIssues",
            Filter: NumberRangeColumnFilter,
            filter: "between",
            aggregate: "sum",
            Aggregated: ({ value }) => `${value} (total)`,
          },
          {
            Header: "Owner",
            accessor: "owner",
            aggregate: "count",
            Aggregated: ({ value }) => `${value} Names`,
          },
        ],
      },
    ],
    []
  );

  const [data, setData] = useState(tableData);
  const [newData, setNewData] = useState(tableData);
  const [originalData] = useState(tableData);

  const skipResetRef = useRef(false);

  const updateMyData = (rowIndex, columnId, value) => {
    skipResetRef.current = true;
    setData((old) =>
      old.map((row, index) => {
        if (index === rowIndex) {
          return {
            ...row,
            [columnId]: value,
          };
        }
        return row;
      })
    );
  };

  useEffect(() => {
    skipResetRef.current = false;
  }, [data]);

  const resetData = () => {
    skipResetRef.current = true;
    setNewData(originalData);
    setData(originalData);
  };

  const addData = (data) => {
    const Data = [...newData, data];
    setNewData(Data);
    setData(Data);
  };

  const deleteData = () => {
    let Data = [];
    Data = selectedRows
      .filter((row) => {
        return !row.isSelected;
      })
      .map((row) => {
        return row.values;
      });
    setNewData(Data);
    setData(Data);
  };

  const duplicateData = () => {
    let Data = [];
    Data = selectedRows
      .filter((row) => {
        return row.isSelected;
      })
      .map((row) => {
        return row.values;
      });
    setNewData([...newData, ...Data]);
    setData([...newData, ...Data]);
  };

  return (
    <Styles>
      <Button
        className="button-reset"
        onClick={resetData}
        variant="contained"
        startIcon={<Icon>sync</Icon>}
      >
        Reset Data
      </Button>
      <TransitionsModal addData={addData} />
      <Button
        className="button-reset"
        onClick={duplicateData}
        variant="contained"
        color="primary"
      >
        Duplicate Data
      </Button>
      <Button
        className="button-reset"
        onClick={deleteData}
        variant="contained"
        color="secondary"
        startIcon={<Delete />}
      >
        Delete Data
      </Button>
      <Table
        columns={columns}
        data={data}
        updateMyData={updateMyData}
        skipReset={skipResetRef.current}
      />
    </Styles>
  );
};
