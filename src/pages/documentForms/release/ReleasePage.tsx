import {
  Box,
  Button,
  Checkbox,
  Chip,
  Collapse,
  FormControl,
  FormControlLabel,
  InputAdornment,
  InputLabel,
  ListSubheader,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  TextField,
  Theme,
  Tooltip,
  useTheme
} from '@mui/material';
import { DatePicker, LocalizationProvider, TimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import { useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import ReleaseDefault from '../../../components/releases/ReleaseDefault';
import { ReleaseMilitary } from '../../../components/releases/ReleaseMilitary';
import jsPDF from 'jspdf';

export const ReleasePage = () => {
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: 100 * 4.5 + 5,
        width: 250
      }
    }
  };

  interface Release {
    date: Dayjs | null;
    timeFrom: Dayjs | null;
    timeTo: Dayjs | null;
    fullDay: boolean;
    members: string[];
    military: boolean;
  }

  const blankData = {
    date: dayjs(),
    timeFrom: dayjs('2022-04-17T8:15'),
    timeTo: dayjs('2022-04-17T14:20'),
    fullDay: false,
    members: [],
    military: false
  };

  const [isMilitary, setIsMilitary] = useState(false);
  const [title, setTitle] = useState('');
  const [responsible, setResponsible] = useState('');
  const [releaseData, setReleaseData] = useState<Release[]>([blankData]);
  const [allMembers, setAllMembers] = useState([
    'Oliver Hansen',
    'Van Henry',
    'April Tucker',
    'Ralph Hubbard',
    'Omar Alexander',
    'Carlos Abbott',
    'Miriam Wagner',
    'Bradley Wilkerson',
    'Virginia Andrews',
    'Kelly Snyder'
  ]);

  const handleDateChange = (index: number, newDate: Dayjs | null) => {
    const newData = [...releaseData];
    newData[index].date = newDate;
    setReleaseData(newData);
  };
  const handleTimeFromChange = (index: number, newTime: Dayjs | null) => {
    const newData = [...releaseData];
    newData[index].timeFrom = newTime;
    setReleaseData(newData);
  };
  const handleTimeToChange = (index: number, newTime: Dayjs | null) => {
    const newData = [...releaseData];
    newData[index].timeTo = newTime;
    setReleaseData(newData);
  };

  const handleFullDayChange = (index: number, event: any) => {
    const newData = [...releaseData];
    newData[index].fullDay = event.target.checked;
    setReleaseData(newData);
  };

  const handleMembersChange = (index: number, event: SelectChangeEvent<string[]>) => {
    const newMembers = event.target.value as string[];
    const newData = [...releaseData];
    newData[index].members = newMembers;
    setReleaseData(newData);
  };

  const handleSendData = async () => {
    console.log({
      dates: releaseData,
      ismilitary: isMilitary,
      title: title,
      responsible: responsible
    });
    ReleaseDefault();
  };

  const handleAddDate = () => {
    const newData = [...releaseData];
    newData.push({ ...blankData, date: dayjs() });
    setReleaseData(newData);
  };

  const handleDeleteDate = () => {
    const newData = [...releaseData];
    newData.pop();
    setReleaseData(newData);
  };

  const handleTitleChange = (event: any) => {
    setTitle(event.target.value);
  };

  const handleResponsibleChange = (event: any) => {
    setResponsible(event.target.value);
  };

  const [showInput, setShowInput] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const handleButtonClick = () => {
    setShowInput(true);
  };

  const handleInputChange = (event: any) => {
    setInputValue(event.target.value);
  };

  const handleInputKeyPress = (event: any, index: number) => {
    if (event.key === 'Enter') {
      setShowInput(false);
      if (inputValue.trim() === '') return;

      const newData = [...releaseData];
      const newMember = inputValue.trim();

      newData[index].members.push(newMember);

      setAllMembers([...allMembers, newMember]);
      setReleaseData(newData);
      setInputValue('');
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, padding: 5 }}>
        {releaseData.map((release, index) => (
          <Box
            key={index}
            sx={{
              display: 'flex',
              flexDirection: 'row',
              gap: 2,
              alignItems: 'center'
            }}
          >
            <DatePicker
              label="Дата освобождения"
              value={release.date}
              onChange={(newDate) => handleDateChange(index, newDate)}
              format="DD/MM/YYYY"
            />
            <TimePicker
              sx={{
                maxWidth: 120
              }}
              label="Начало"
              ampm={false}
              value={release.timeFrom}
              disabled={release.fullDay}
              onChange={(newValue) => handleTimeFromChange(index, newValue)}
            />
            <TimePicker
              sx={{
                maxWidth: 120
              }}
              label="Конец"
              ampm={false}
              disabled={release.fullDay}
              value={release.timeTo}
              onChange={(newValue) => handleTimeToChange(index, newValue)}
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={release.fullDay}
                  onChange={(event) => handleFullDayChange(index, event)}
                  inputProps={{ 'aria-label': 'controlled' }}
                />
              }
              label="Весь день"
            />
            <FormControl sx={{ m: 1, width: 300 }}>
              <InputLabel id={`demo-multiple-chip-label-${index}`}>Кому</InputLabel>
              <Select
                labelId={`demo-multiple-chip-label-${index}`}
                id={`demo-multiple-chip-${index}`}
                multiple
                value={release.members}
                onChange={(event) => handleMembersChange(index, event)}
                input={<OutlinedInput id={`select-multiple-chip-${index}`} label="Chip" />}
                renderValue={(selected) => (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {selected.map((value) => (
                      <Chip key={value} label={value} />
                    ))}
                  </Box>
                )}
                MenuProps={MenuProps}
              >
                {allMembers.map((option, i) => (
                  <MenuItem key={i} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Button variant="outlined" onClick={handleButtonClick} sx={{ width: 5 }}>
              <PersonAddIcon />
            </Button>
            <Collapse in={showInput}>
              <Box>
                <Tooltip title="Нажмите Enter чтобы добавить в список для освобожения. Формат: Фамилия Имя Отчество X курс N группа">
                  <TextField
                    autoFocus
                    value={inputValue}
                    onChange={handleInputChange}
                    onKeyPress={(event) => handleInputKeyPress(event, index)}
                    placeholder="Введите данные"
                  />
                </Tooltip>
              </Box>
            </Collapse>
          </Box>
        ))}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            gap: 2,
            alignItems: 'center'
          }}
        >
          <Button onClick={handleAddDate} variant="outlined" sx={{ width: '50%' }}>
            <AddIcon />
          </Button>
          <Button
            onClick={handleDeleteDate}
            variant="outlined"
            sx={{ width: '50%' }}
            disabled={releaseData.length === 1}
          >
            <RemoveIcon />
          </Button>
        </Box>
        <FormControlLabel
          control={
            <Checkbox
              checked={isMilitary}
              onChange={(event) => setIsMilitary(event.target.checked)}
              inputProps={{ 'aria-label': 'controlled' }}
            />
          }
          label="Для военки"
          sx={{ mt: 2 }}
        />
        <TextField label="Название мероприятия" value={title} onChange={handleTitleChange} sx={{ mt: 2, width: 300 }} />
        <TextField
          label="Подписывает"
          value={responsible}
          onChange={handleResponsibleChange}
          sx={{ mt: 2, width: 300 }}
        />
        <Button onClick={handleSendData} variant="outlined" sx={{ mt: 2, width: 300 }}>
          Сгенерировать документ
        </Button>
      </Box>
    </LocalizationProvider>
  );
};
