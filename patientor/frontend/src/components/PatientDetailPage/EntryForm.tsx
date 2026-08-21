import { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Alert,
  Card,
  CardContent,
  Box,
  Typography,
  TextField,
  Button,
  Divider,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Checkbox,
  ListItemText,
} from '@mui/material';
import type {
  BaseEntry,
  EntryWithoutId,
  HealthCheckRating,
  HealthCheckSpecific,
  HospitalSpecific,
  OccupationalSpecific,
  Diagnosis,
} from '../../types';
import diagnosisService from '../../services/diagnoses';

type EntryType = EntryWithoutId['type'];

const EntryForm = ({
  onEntrySubmit,
}: {
  onEntrySubmit: (values: EntryWithoutId) => Promise<void>;
}) => {
  const [entryType, setEntryType] = useState<EntryType>('HealthCheck');
  const [baseEntryFields, setBaseEntryFields] = useState<Omit<BaseEntry, 'id'>>(
    {
      specialist: '',
      date: '',
      description: '',
      diagnosisCodes: [],
    },
  );

  const [healthCheckFields, setHealthCheckFields] = useState<
    Omit<HealthCheckSpecific, 'type'>
  >({
    healthCheckRating: 0,
  });

  const [occupationalHealthcareFields, setOccupationalHealthcareFields] =
    useState<Omit<OccupationalSpecific, 'type'>>({
      employerName: '',
      sickLeave: { startDate: '', endDate: '' },
    });

  const [hospitalFields, setHospitalFields] = useState<
    Omit<HospitalSpecific, 'type'>
  >({
    discharge: { date: '', criteria: '' },
  });

  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);
  const [selectedDiagnosisCodes, setSelectedDiagnosisCodes] = useState<
    string[]
  >([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDiagnoses = async () => {
      try {
        const diagnoses = await diagnosisService.getAll();
        setDiagnoses(diagnoses);
      } catch {
        setError('Could not fetch diagnoses.');
      }
    };

    void fetchDiagnoses();
  }, []);

  const handleBaseChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;
    setBaseEntryFields((prev) => ({ ...prev, [name]: value }));
  };

  const handleNestedChange = (
    section: 'sickLeave' | 'discharge',
    field: string,
    value: string,
  ) => {
    if (section === 'sickLeave') {
      setOccupationalHealthcareFields((prev) => ({
        ...prev,
        sickLeave: {
          ...(prev.sickLeave || { startDate: '', endDate: '' }),
          [field]: value,
        },
      }));
    } else if (section === 'discharge') {
      setHospitalFields((prev) => ({
        ...prev,
        discharge: { ...prev.discharge, [field]: value },
      }));
    }
  };

  const handleSubmit = async (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    const diagnosisCodes = selectedDiagnosisCodes;

    const sharedData = { ...baseEntryFields, diagnosisCodes };
    let entryToSubmit: EntryWithoutId;

    switch (entryType) {
      case 'HealthCheck':
        entryToSubmit = {
          ...sharedData,
          type: 'HealthCheck',
          ...healthCheckFields,
        };
        break;
      case 'OccupationalHealthcare':
        entryToSubmit = {
          ...sharedData,
          type: 'OccupationalHealthcare',
          employerName: occupationalHealthcareFields.employerName,
          ...(occupationalHealthcareFields.sickLeave?.startDate ||
          occupationalHealthcareFields.sickLeave?.endDate
            ? { sickLeave: occupationalHealthcareFields.sickLeave }
            : {}),
        };
        break;
      case 'Hospital':
        entryToSubmit = {
          ...sharedData,
          type: 'Hospital',
          ...hospitalFields,
        };
        break;
      default:
        return setError('Unknown entry type selection.');
    }

    try {
      await onEntrySubmit(entryToSubmit);
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.error ?? 'Invalid entry fields provided.');
      } else {
        setError('Could not establish connection to add entry.');
      }
    }
  };

  const renderSpecificFields = () => {
    switch (entryType) {
      case 'HealthCheck':
        return (
          <TextField
            select
            label="Health check rating"
            name="healthCheckRating"
            fullWidth
            required
            value={healthCheckFields.healthCheckRating}
            onChange={(e) =>
              setHealthCheckFields({
                healthCheckRating: Number(e.target.value) as HealthCheckRating,
              })
            }
          >
            <MenuItem value={0}>Healthy</MenuItem>
            <MenuItem value={1}>Low Risk</MenuItem>
            <MenuItem value={2}>High Risk</MenuItem>
            <MenuItem value={3}>Critical Risk</MenuItem>
          </TextField>
        );

      case 'OccupationalHealthcare':
        return (
          <Box display="flex" flexDirection="column" gap={2}>
            <TextField
              label="Employer Name"
              name="employerName"
              fullWidth
              required
              value={occupationalHealthcareFields.employerName}
              onChange={(e) =>
                setOccupationalHealthcareFields((prev) => ({
                  ...prev,
                  employerName: e.target.value,
                }))
              }
            />
            <Typography
              variant="subtitle2"
              color="textSecondary"
              sx={{ mb: -1 }}
            >
              Sick Leave (Optional)
            </Typography>
            <Box display="flex" gap={2}>
              <TextField
                label="Start Date"
                type="date"
                fullWidth
                value={occupationalHealthcareFields.sickLeave?.startDate ?? ''}
                onChange={(e) =>
                  handleNestedChange('sickLeave', 'startDate', e.target.value)
                }
                slotProps={{ inputLabel: { shrink: true } }}
              />
              <TextField
                label="End Date"
                type="date"
                fullWidth
                value={occupationalHealthcareFields.sickLeave?.endDate ?? ''}
                onChange={(e) =>
                  handleNestedChange('sickLeave', 'endDate', e.target.value)
                }
                slotProps={{ inputLabel: { shrink: true } }}
              />
            </Box>
          </Box>
        );

      case 'Hospital':
        return (
          <Box display="flex" flexDirection="column" gap={2}>
            <TextField
              label="Discharge Date"
              type="date"
              fullWidth
              required
              value={hospitalFields.discharge.date}
              onChange={(e) =>
                handleNestedChange('discharge', 'date', e.target.value)
              }
              slotProps={{ inputLabel: { shrink: true } }}
            />
            <TextField
              label="Discharge Criteria"
              fullWidth
              required
              value={hospitalFields.discharge.criteria}
              onChange={(e) =>
                handleNestedChange('discharge', 'criteria', e.target.value)
              }
            />
          </Box>
        );
      default:
        return null;
    }
  };

  return (
    <Card sx={{ mt: 2 }}>
      <CardContent sx={{ p: 4 }} component="form" onSubmit={handleSubmit}>
        <Box display="flex" alignItems="center" mb={2}>
          <Typography variant="h5" component="h3" fontWeight="bold">
            New Entry
          </Typography>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Divider />

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 3 }}>
          <TextField
            select
            label="Visit type"
            name="type"
            fullWidth
            required
            value={entryType}
            onChange={(e) => setEntryType(e.target.value as EntryType)}
          >
            <MenuItem value="HealthCheck">Health Check</MenuItem>
            <MenuItem value="OccupationalHealthcare">
              Occupational Healthcare
            </MenuItem>
            <MenuItem value="Hospital">Hospital</MenuItem>
          </TextField>

          <TextField
            label="Specialist"
            name="specialist"
            fullWidth
            required
            value={baseEntryFields.specialist}
            onChange={handleBaseChange}
          />

          <TextField
            label="Date"
            name="date"
            type="date"
            fullWidth
            required
            value={baseEntryFields.date}
            onChange={handleBaseChange}
            slotProps={{ inputLabel: { shrink: true } }}
          />

          <TextField
            label="Description"
            name="description"
            multiline
            rows={2}
            fullWidth
            required
            value={baseEntryFields.description}
            onChange={handleBaseChange}
          />

          <FormControl fullWidth>
            <InputLabel id="diagnosis-codes-label">Diagnosis codes</InputLabel>

            <Select
              labelId="diagnosis-codes-label"
              multiple
              value={selectedDiagnosisCodes}
              onChange={(event) => {
                const value = event.target.value;

                setSelectedDiagnosisCodes(
                  typeof value === 'string' ? value.split(',') : value,
                );
              }}
              renderValue={(selected) => selected.join(', ')}
              label="Diagnosis codes"
            >
              {diagnoses.map((diagnosis) => (
                <MenuItem key={diagnosis.code} value={diagnosis.code}>
                  <Checkbox
                    checked={selectedDiagnosisCodes.includes(diagnosis.code)}
                  />
                  <ListItemText
                    primary={`${diagnosis.code} — ${diagnosis.name}`}
                  />
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Box
            sx={{
              mt: 1,
              mb: 1,
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
            }}
          >
            {renderSpecificFields()}
          </Box>

          <Button type="submit" variant="contained" size="large" sx={{ mt: 1 }}>
            Add
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default EntryForm;
