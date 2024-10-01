import { useState, useEffect } from 'react';
import Autocomplete from '@mui/material/Autocomplete/Autocomplete';
import PropTypes from 'prop-types';
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress';
import IconButton from '@mui/material/IconButton';
import RefreshIcon from '@mui/icons-material/Refresh';
import _ from '@lodash';
import { Controller } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { isEqual, isEmpty } from 'lodash';
import withReducer from 'app/store/withReducer';
import { selectBussines, getGeneric } from '../store/bussinessSlice';
import reducer from '../store';

function GenericComponent({
  loadingEvent,
  key,
  id,
  name,
  label,
  keyName,
  valueName,
  multiple,
  disabledPort,
  url,
  defaultKey,
  select,
  setValue,
  disabled,
  size,
  methods,
  style,
  groupFilterKey = '',
  isSuccess,
  ...rest
}) {
  const bussinessStore = useSelector(selectBussines);
  const dispatch = useDispatch();

  const [refreshing, setRefreshing] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const [genericList, setGenericList] = useState(
    bussinessStore[url]?.data && bussinessStore[url]?.data || []
  );
  const [isRefreshClicked, setIsRefreshClicked] = useState(false);

  useEffect(() => {
    if (isEmpty(bussinessStore[url]?.data) && retryCount <= 3) {
      if (!isRefreshClicked) {
        dispatch(getGeneric(url));
      }
      setRefreshing(true);
      setRetryCount(retryCount + 1);
    } else {
      setGenericList(bussinessStore[url]?.data);
      setRefreshing(false);
    }
    setIsRefreshClicked(false);
  }, [bussinessStore[url]?.data, dispatch]);

  const { control, formState } = methods;
  const { errors } = formState;

  useEffect(() => {
    if (isSuccess) {
      executeFunctions();
    }
  }, [isSuccess])


  const executeFunctions = () => {
    dispatch(getGeneric(url));
    setIsRefreshClicked(true);
    setRefreshing(true);
  }

  function handleClick() {
    executeFunctions();
  }

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <Autocomplete
          {...rest}
          key={key}
          size={size || 'small'}
          groupBy={(option) => option[groupFilterKey]}
          fullWidth
          onChange={(event, newValue) => {
            if (newValue) {
              field.onChange(newValue[keyName]);
            } else {
              field.onChange(null);
            }

            if (select) {
              select(newValue[keyName]);
            }

            if (setValue) {
              setValue(newValue[keyName])
            }
          }}
          name={name}
          id={id}
          value={
            (genericList?.length > 0 && field.value) || isEqual(field.value, 0) || defaultKey != null
              ? _.find(genericList, { [keyName]: field?.value ?? defaultKey ?? null })
              : null
          }
          options={genericList}
          loading={bussinessStore[url]?.loading}
          disablePortal={disabledPort}
          loadingText="yükleniyor..."
          getOptionLabel={(option) => option[valueName]}
          className="mt-8 mb-12 mr-4"
          component="form"
          disabled={disabled ?? false}
          sx={{
            '& .MuiTextField-root': { m: 0, width: '100%' },
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label={label ?? 'Değer Seçin'}
              error={!!errors?.[name]}
              helperText={errors?.[name]?.message}
              variant="outlined"
              InputProps={{
                ...params.InputProps,
                startAdornment: (
                  <>
                    {refreshing ? (
                      <CircularProgress color="inherit" size={15} />
                    ) : (
                      <IconButton onClick={handleClick} size='small'>
                        <RefreshIcon />
                      </IconButton>
                    )}
                  </>
                ),
              }}
            />
            // </div>
          )}
        />
      )}
    />
  );
}

GenericComponent.defaultProps = {
  loadingEvent: false,
  multiple: false,
};
GenericComponent.propTypes = {
  loadingEvent: PropTypes.bool,
  label: PropTypes.string.isRequired,
  multiple: PropTypes.bool,
};
export default withReducer('componentStore', reducer)(GenericComponent);
