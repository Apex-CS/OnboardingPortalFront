import { useEffect, useImperativeHandle, useMemo, useRef }from 'react';
import Box from '@mui/material/Box';
import Rating, { RatingProps } from '@mui/material/Rating';
import {
  GridFilterInputValueProps,
  DataGrid,
  GridFilterItem,
  GridFilterOperator,
  GridToolbarFilterButton,
} from '@mui/x-data-grid';
import { useDemoData } from '@mui/x-data-grid-generator';
import { Button, Stack } from '@mui/material';
import ClearNotification from '../../components/Notifications/ClearNotificaiton';
import { useNotification } from '../../hooks/useNotification';

function RatingInputValue(props: GridFilterInputValueProps) {
  const { item, applyValue, focusElementRef } = props;

  const ratingRef: React.Ref<any> = useRef(null);
  useImperativeHandle(focusElementRef, () => ({
    focus: () => {
      ratingRef.current
        .querySelector(`input[value="${Number(item.value) || ''}"]`)
        .focus();
    },
  }));

  const handleFilterChange: RatingProps['onChange'] = (event, newValue) => {
    applyValue({ ...item, value: newValue });
  };

  return (
    <Box
      sx={{
        display: 'inline-flex',
        flexDirection: 'row',
        alignItems: 'center',
        height: 48,
        pl: '20px',
      }}
    >
      <Rating
        name="custom-rating-filter-operator"
        placeholder="Filter value"
        value={Number(item.value)}
        onChange={handleFilterChange}
        precision={0.5}
        ref={ratingRef}
      />
    </Box>
  );
}

const ratingOnlyOperators: GridFilterOperator[] = [
  {
    label: 'Above',
    value: 'above',
    getApplyFilterFn: (filterItem: GridFilterItem) => {
      if (!filterItem.field || !filterItem.value || !filterItem.operator) {
        return null;
      }

      return (params): boolean => {
        return Number(params.value) >= Number(filterItem.value);
      };
    },
    InputComponent: RatingInputValue,
    InputComponentProps: { type: 'number' },
    getValueAsString: (value: number) => `${value} Stars`,
  },
];

const VISIBLE_FIELDS = ['name', 'rating', 'country', 'dateCreated', 'isAdmin'];

export default function CustomRatingOperator() {
  const { data } = useDemoData({
    dataSet: 'Employee',
    // visibleFields: VISIBLE_FIELDS,
    rowLength: 100,
  });

  const columns = useMemo(
    () =>
      data.columns.map((col) =>
        col.field === 'rating'
          ? {
              ...col,
              filterOperators: ratingOnlyOperators,
            }
          : col,
      ),
    [data.columns],
  );

  const { displayNotification } = useNotification();
  useEffect(() => {
      displayNotification({
          message: "This notification displays when the app first renders!"
      });
  }, [displayNotification]);

  return (
    <div style={{ height: 400, width: '100%' }}>
      <div>
                <Stack spacing={1} width="50%">
                    <Button
                        variant="contained"
                        onClick={() =>
                        displayNotification({ message: "This is the default notification" })
                        }
                    >
                        Default Notification
                    </Button>
                    <Button
                        variant="contained"
                        onClick={() =>
                        displayNotification({
                            message:
                            "Notification with a different type and therefore different style",
                            type: "warning"
                        })
                        }
                    >
                        Warning Notification
                    </Button>
                    <ClearNotification />
                  </Stack>
            </div>
      <DataGrid
        {...data}
        columns={columns}
        slots={{
          toolbar: GridToolbarFilterButton,
        }}
        initialState={{
          ...data.initialState,
          filter: {
            ...data.initialState?.filter,
            filterModel: {
              items: [
                {
                  id: 1,
                  field: 'rating',
                  value: '3.5',
                  operator: 'above',
                },
              ],
            },
          },
        }}
      />
    </div>
  );
}