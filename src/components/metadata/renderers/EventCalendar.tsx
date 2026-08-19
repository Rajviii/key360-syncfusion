'use client';

import * as React from "react";
import { useEffect, useRef, useState } from 'react';
import './event-calendar.css';
import { ClickEventArgs, ItemDirective, ItemsDirective, SidebarComponent, ToolbarComponent } from '@syncfusion/ej2-react-navigations';
import { ScheduleComponent, Day, Week, WorkWeek, Month, Agenda, Inject, ResourcesDirective, ResourceDirective, TimelineMonth, Year, DragAndDrop, Resize, resetTime, ViewsDirective, ViewDirective, EventRenderedArgs, ActionEventArgs, addDays, EJ2Instance } from '@syncfusion/ej2-react-schedule';
import { CalendarComponent } from '@syncfusion/ej2-react-calendars';
import { ListViewComponent, SelectEventArgs } from '@syncfusion/ej2-react-lists';
import { ColumnDirective, ColumnsDirective, GridComponent } from "@syncfusion/ej2-react-grids";
import { DialogComponent } from "@syncfusion/ej2-react-popups";
import { ColorPickerComponent, TextBoxComponent } from "@syncfusion/ej2-react-inputs";
import { extend, isNullOrUndefined } from "@syncfusion/ej2-base";
import { DropDownList } from "@syncfusion/ej2-react-dropdowns";

interface EventCalendarProps {
  data?: any[];
}

export const EventCalendar: React.FC<EventCalendarProps> = ({ data: initialLeaveData }) => {
  const scheduleObj = useRef<ScheduleComponent>(null);
  const calendarSidebarObj = useRef<SidebarComponent>(null);
  const colorPickerObj = useRef<ColorPickerComponent>(null);
  const calendarObj = useRef<CalendarComponent>(null);
  const unPlannedSidebarObj = useRef<SidebarComponent>(null);
  const calendarsListObj = useRef<any>(null);
  const gridObj = useRef<GridComponent>(null);
  const dialogObj = useRef<DialogComponent>(null);
  const toolbarObj = useRef<ToolbarComponent>(null);
  const calendarNameObj = useRef<any>(null);
  const saveButtonRef = useRef<HTMLButtonElement>(null);

  const isAddRef = useRef<boolean>(false);
  const [currentDate] = useState(new Date());

  const [calendars, setCalendars] = useState([
    { name: "Annual Paid Leave", id: 1, color: "#c43081", isSelected: true },
    { name: "Sick & Personal", id: 2, color: "#ff7f50", isSelected: true },
    { name: "Company Holidays", id: 3, color: "#AF27CD", isSelected: true },
    { name: "Maternity / Paternity", id: 4, color: "#808000", isSelected: true }
  ]);

  const resourceData = [
    { name: 'Morne Morkel', id: 1, color: '#df5286' },
    { name: 'Ariana Grande', id: 2, color: '#7fa900' },
    { name: 'David Miller', id: 3, color: '#ea7a57' },
    { name: 'Michael Chang', id: 4, color: '#5978ee' },
    { name: 'Elena Rostova', id: 5, color: '#df5286' }
  ];

  const getSelectedCalendars = (calList = calendars) => {
    const selectedIds: number[] = [];
    const selectedItems: any[] = [];
    for (const calendar of calList) {
      if (calendar.isSelected) {
        selectedIds.push(calendar.id);
        selectedItems.push(calendar);
      }
    }
    return { ids: selectedIds, items: selectedItems };
  };

  const generateDefaultCalendarData = (): Record<string, any>[] => {
    const today = resetTime(new Date());
    const sampleData: Record<string, any>[] = [
      {
        Id: 101,
        Subject: 'Morne Morkel - Paid Leave (Family Vacation)',
        StartTime: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1, 9, 0),
        EndTime: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 5, 17, 0),
        IsAllDay: true,
        IsPlanned: true,
        CalendarId: 1,
        ResourceId: 1
      },
      {
        Id: 102,
        Subject: 'Ariana Grande - Sick Leave',
        StartTime: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 2, 9, 0),
        EndTime: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 1, 17, 0),
        IsAllDay: true,
        IsPlanned: true,
        CalendarId: 2,
        ResourceId: 2
      },
      {
        Id: 103,
        Subject: 'David Miller - Paternity Leave',
        StartTime: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 7, 9, 0),
        EndTime: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 21, 17, 0),
        IsAllDay: true,
        IsPlanned: true,
        CalendarId: 4,
        ResourceId: 3
      },
      {
        Id: 104,
        Subject: 'Michael Chang - Personal Unpaid Leave',
        StartTime: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 3, 10, 0),
        EndTime: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 3, 16, 0),
        IsAllDay: false,
        IsPlanned: true,
        CalendarId: 2,
        ResourceId: 4
      },
      {
        Id: 105,
        Subject: 'Elena Rostova - Annual Leave (Pending Review)',
        StartTime: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 10, 9, 0),
        EndTime: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 14, 17, 0),
        IsAllDay: true,
        IsPlanned: false,
        CalendarId: 1,
        ResourceId: 5
      },
      {
        Id: 106,
        Subject: 'Company Foundation Day Holiday',
        StartTime: new Date(today.getFullYear(), today.getMonth(), 15, 0, 0),
        EndTime: new Date(today.getFullYear(), today.getMonth(), 15, 23, 59),
        IsAllDay: true,
        IsPlanned: true,
        CalendarId: 3,
        ResourceId: 4
      }
    ];

    if (initialLeaveData && initialLeaveData.length > 0) {
      initialLeaveData.forEach((item, index) => {
        if (!sampleData.some(s => s.Id === item.id)) {
          const startDate = item.startDate ? new Date(item.startDate) : new Date();
          const endDate = item.endDate ? new Date(item.endDate) : addDays(startDate, item.totalDays || 1);
          sampleData.push({
            Id: item.id || 200 + index,
            Subject: `${item.employeeName} - ${item.leaveType} (${item.status})`,
            StartTime: startDate,
            EndTime: endDate,
            IsAllDay: true,
            IsPlanned: item.status === 'Approved',
            CalendarId: item.leaveType?.includes('Sick') ? 2 : item.leaveType?.includes('Paid') ? 1 : item.leaveType?.includes('Maternity') ? 4 : 3,
            ResourceId: (index % 5) + 1
          });
        }
      });
    }

    return sampleData;
  };

  const [appointmentData, setAppointmentData] = useState<Record<string, any>[]>(generateDefaultCalendarData);

  const getFilteredData = (appointments = appointmentData, calList = calendars) => {
    const selected = getSelectedCalendars(calList);
    const planned: Record<string, any>[] = [];
    const unPlanned: Record<string, any>[] = [];
    for (const data of appointments) {
      if (selected.ids.indexOf(data.CalendarId) > -1) {
        if (data.IsPlanned) {
          planned.push(data);
        } else {
          unPlanned.push(data);
        }
      }
    }
    return { planned, unPlanned };
  };

  const filteredData = getFilteredData();
  const eventSettings = { dataSource: extend([], filteredData.planned, undefined, true) as Record<string, any>[] };

  const onCalendarListChange = (args: SelectEventArgs): void => {
    if (args?.event?.target) {
      const target = args.event.target as HTMLElement;
      if (target.classList.contains('e-edit')) {
        args.cancel = true;
        openDialog(args, 'Save');
      } else if (target.classList.contains('e-trash')) {
        args.cancel = true;
        removeCalendar(args);
      } else {
        calendarSelection(args);
      }
    } else {
      calendarSelection(args);
    }
  };

  const openDialog = (args: SelectEventArgs, action: string) => {
    if (!args?.data) return;
    const data = args.data as Record<string, any>;
    if (calendarNameObj.current && colorPickerObj.current && dialogObj.current && saveButtonRef.current) {
      calendarNameObj.current.value = data.name || '';
      colorPickerObj.current.value = data.color || '#008000';
      saveButtonRef.current.innerHTML = action;
      dialogObj.current.header = "Edit Calendar";
      dialogObj.current.show();
      saveButtonRef.current.onclick = (): void => {
        if (calendarNameObj.current && colorPickerObj.current) {
          const rawVal = calendarNameObj.current.value;
          const newValue = (typeof rawVal === 'string' ? rawVal : (rawVal || '')).trim();
          const rawColor = colorPickerObj.current.value;
          const newColor = (typeof rawColor === 'string' ? rawColor : (rawColor || '#008000')).trim();
          if (newValue.length > 0) {
            const updated = calendars.map((item) => {
              if (item.name === data.name) {
                return { ...item, name: newValue, color: newColor };
              }
              return item;
            });
            setCalendars(updated);
            if (calendarsListObj.current) {
              calendarsListObj.current.dataSource = extend([], updated, undefined, true) as Record<string, any>[];
            }
            if (scheduleObj.current) {
              scheduleObj.current.refreshEvents();
            }
            dialogObj.current?.hide();
          }
        }
      };
    }
  };

  const removeCalendar = (args: SelectEventArgs): void => {
    if (!args?.data) return;
    const itemData = args.data as Record<string, any>;
    if (calendarsListObj.current && args.item) {
      calendarsListObj.current.removeItem(args.item);
    }
    const updatedCalendars = calendars.filter((item: Record<string, any>): boolean => item.id !== itemData.id);
    const updatedAppointments = appointmentData.filter((item: Record<string, any>): boolean => item.CalendarId !== itemData.id);
    setCalendars(updatedCalendars);
    setAppointmentData(updatedAppointments);
    const nextFiltered = getFilteredData(updatedAppointments, updatedCalendars);
    if (scheduleObj.current) {
      scheduleObj.current.eventSettings.dataSource = extend([], nextFiltered.planned, undefined, true) as Record<string, any>[];
    }
    if (gridObj.current) {
      gridObj.current.dataSource = extend([], nextFiltered.unPlanned, undefined, true) as Record<string, any>[];
    }
  };

  const updateTextValue = (): void => {
    if (isAddRef.current) {
      if (calendarNameObj.current && colorPickerObj.current && dialogObj.current) {
        const rawVal = calendarNameObj.current.value;
        let newValue: string = (typeof rawVal === 'string' ? rawVal : (rawVal || '')).trim();
        newValue = newValue === "" ? "New Calendar" : newValue;
        const newId: number = (calendars.length + 1);
        const newItem = { name: newValue, id: newId, color: colorPickerObj.current.value || '#008000', isSelected: true };
        const updated = [...calendars, newItem];
        setCalendars(updated);
        if (calendarsListObj.current) {
          calendarsListObj.current.dataSource = extend([], updated, undefined, true) as Record<string, any>[];
        }
        dialogObj.current.hide();
      }
      isAddRef.current = false;
    }
  };

  const onListActionComplete = (): void => {
    setTimeout(() => {
      if (calendarsListObj.current?.element) {
        const iconAdd: HTMLElement | null = calendarsListObj.current.element.querySelector(".e-plus");
        applyBackgroundColors();
        if (iconAdd) {
          iconAdd.addEventListener("click", () => {
            isAddRef.current = true;
            if (calendarNameObj.current) calendarNameObj.current.value = '';
            if (colorPickerObj.current) colorPickerObj.current.value = "#008000ff";
            if (saveButtonRef.current) saveButtonRef.current.innerHTML = "Add";
            if (dialogObj.current) dialogObj.current.show();
          });
        }
      }
    }, 200);
  };

  const calendarSelection = (args: SelectEventArgs): void => {
    if (!args?.data) return;
    const idFromArgs: number = Number((args.data as { [key: string]: Object; }).id);
    const updated = calendars.map((item, idx) => {
      if (idx === args.index || item.id === idFromArgs) {
        return { ...item, isSelected: Boolean(args.isChecked) };
      }
      return item;
    });
    setCalendars(updated);
    if (args.isChecked) {
      changeCheckboxBackgroundColor(idFromArgs);
    }
    const nextFiltered = getFilteredData(appointmentData, updated);
    if (scheduleObj.current) {
      scheduleObj.current.eventSettings.dataSource = extend([], nextFiltered.planned, undefined, true) as Record<string, any>[];
    }
    if (gridObj.current) {
      gridObj.current.dataSource = extend([], nextFiltered.unPlanned, undefined, true) as Record<string, any>[];
    }
  };

  const applyBackgroundColors = (): void => {
    calendars.forEach((calendar: Record<string, any>): void => {
      if (calendarsListObj.current?.element) {
        const listItem: Element | null = calendarsListObj.current.element.querySelector(`[data-uid="${calendar.id}"]`);
        if (listItem) {
          const checkboxFrame: Element | null = listItem.querySelector(`.e-checkbox-wrapper .e-frame.e-check,
                      .e-css.e-checkbox-wrapper .e-frame.e-check,.e-checkbox-wrapper .e-frame,.e-css.e-checkbox-wrapper .e-frame`);
          if (checkboxFrame) {
            (checkboxFrame as HTMLElement).style.backgroundColor = calendar.color;
            (checkboxFrame as HTMLElement).style.borderColor = calendar.color;
          }
        }
      }
    });
  };

  const changeCheckboxBackgroundColor = (idFromArgs: number): void => {
    const listItem = document.querySelector(`[data-uid="${idFromArgs}"]`);
    if (listItem) {
      const checkboxFrame = listItem.querySelector('.e-checkbox-wrapper .e-frame.e-check');
      const selectedItem = calendars.find((item) => item.id === idFromArgs);
      if (checkboxFrame && selectedItem?.color) {
        (checkboxFrame as HTMLElement).style.backgroundColor = selectedItem.color;
        (checkboxFrame as HTMLElement).style.borderColor = selectedItem.color;
      }
    }
  };

  const onToolbarItemClicked = (args: ClickEventArgs) => {
    if (!args.item || !scheduleObj.current) {
      return;
    }
    switch (args.item.cssClass) {
      case 'e-menu-btn':
        calendarSidebarObj.current?.toggle();
        break;
      case 'e-create':
        if (calendars.length > 0) {
          const selected = getSelectedCalendars();
          const data: Record<string, any> = {
            StartTime: resetTime(new Date()),
            EndTime: resetTime(addDays(new Date(), 1)),
            ResourceId: selected.ids[0] || calendars[0]?.id
          };
          scheduleObj.current.openEditor(data, 'Add', true);
        }
        break;
      case 'e-previous':
        if (scheduleObj.current.activeView) {
          scheduleObj.current.changeDate(scheduleObj.current.activeView.getNextPreviousDate('Previous'));
        }
        break;
      case 'e-next':
        if (scheduleObj.current.activeView) {
          scheduleObj.current.changeDate(scheduleObj.current.activeView.getNextPreviousDate('Next'));
        }
        break;
      case 'e-today':
        scheduleObj.current.selectedDate = new Date();
        break;
      case 'e-day':
        scheduleObj.current.currentView = 'Day';
        break;
      case 'e-week':
        scheduleObj.current.currentView = 'Week';
        break;
      case 'e-month':
        scheduleObj.current.currentView = 'Month';
        break;
      case 'e-agenda':
        scheduleObj.current.currentView = 'Agenda';
        break;
      case 'e-timeline':
        scheduleObj.current.currentView = 'TimelineMonth';
        break;
      case 'e-year':
        scheduleObj.current.currentView = 'Year';
        break;
      default:
        break;
    }
  };

  const onScheduleActionComplete = (args: ActionEventArgs): void => {
    if (args.requestType === 'dateNavigate' || args.requestType === 'viewNavigate') {
      updateDateRange();
      if (args.requestType === 'dateNavigate' && calendarObj.current && scheduleObj.current) {
        if (calendarObj.current.value && scheduleObj.current.selectedDate) {
          if (resetTime(calendarObj.current.value as Date).getTime() !== resetTime(scheduleObj.current.selectedDate).getTime()) {
            calendarObj.current.value = scheduleObj.current.selectedDate;
          }
        }
      }
    } else if (args.requestType === "eventCreated" || args.requestType === "eventChanged" || args.requestType === "eventRemoved") {
      let updatedAppointments = [...appointmentData];
      if (args.addedRecords) {
        for (const event of args.addedRecords) {
          event.IsPlanned = true;
          updatedAppointments.push(event);
        }
      }
      if (args.changedRecords) {
        for (const event of args.changedRecords) {
          const index: number = updatedAppointments.findIndex((item: Record<string, any>): boolean => item.Id === event.Id);
          if (index > -1) updatedAppointments[index] = event;
        }
      }
      if (args.deletedRecords) {
        for (const event of args.deletedRecords) {
          const index: number = updatedAppointments.findIndex((item: Record<string, any>): boolean => item.Id === event.Id);
          if (index > -1) updatedAppointments.splice(index, 1);
        }
      }
      setAppointmentData(updatedAppointments);
    }
  };

  const updateDateRange = () => {
    let dateRange: string = '';
    if (scheduleObj.current && toolbarObj.current?.element) {
      const dateCollection: Date[] = scheduleObj.current.getCurrentViewDates();
      if (dateCollection && dateCollection.length > 0) {
        dateRange = scheduleObj.current.getDateRangeText(dateCollection);
        if (dateRange && dateRange !== '') {
          const dateRangeElement: HTMLElement | null = toolbarObj.current.element.querySelector('.e-date-range .e-tbar-btn-text');
          const btnElement: HTMLElement | null = toolbarObj.current.element.querySelector('.e-date-range .e-tbar-btn');
          if (btnElement) btnElement.setAttribute('aria-label', dateRange);
          if (dateRangeElement) dateRangeElement.textContent = dateRange;
        }
      }
    }
  };

  const valueChange = (args: any) => {
    if (args?.isInteracted && args.value && scheduleObj.current) {
      scheduleObj.current.selectedDate = args.value;
    }
  };

  const listTemplate = (data: { name: string; id: number; color: string; isSelected: boolean }) => {
    return (
      <div className="calendar-list-item">
        <div className="calendar-name" title={data?.name || ''}>
          {data?.name || ''}
        </div>
        {data?.id !== 1 && (
          <div className="calendar-buttons">
            <span id="calendar-edit-btn" className="e-icons e-edit" data-calendar-id={data?.id}></span>
            <span id="calendar-delete-btn" className="e-icons e-trash" data-calendar-id={data?.id}></span>
          </div>
        )}
      </div>
    );
  };

  const listHeaderTemplate = () => {
    return (
      <div className="calendars-list-header">
        <div className="header-text">Leave Calendars</div>
        <div className="header-icon e-icons e-plus" title="Add New Calendar"></div>
      </div>
    );
  };

  const schedulePopupOpen = (args: EventRenderedArgs) => {
    if (!args?.element) return;
    if (args.type === "Editor") {
      if (!args.element.querySelector(".custom-field-row")) {
        const row = document.createElement('div');
        row.className = 'custom-field-row';
        const formElement: HTMLElement | null = args.element.querySelector(".e-schedule-form");
        if (formElement && formElement.firstChild) {
          formElement.firstChild.insertBefore(row, args.element.querySelector(".e-resources-row"));
          const container = document.createElement('div');
          container.className = 'custom-field-container';
          const inputEle = document.createElement('input');
          inputEle.className = 'e-field';
          inputEle.name = 'CalendarId';
          container.appendChild(inputEle);
          row.appendChild(container);
          const selected = getSelectedCalendars();
          const dropDownList = new DropDownList({
            dataSource: extend([], calendars, undefined, true) as Record<string, any>[],
            cssClass: "calendar-ddl",
            fields: { text: "name", value: "id" },
            value: args.data?.CalendarId || selected.ids[0] || calendars[0]?.id,
            floatLabelType: "Always",
            placeholder: "Calendar Category"
          });
          dropDownList.appendTo(inputEle);
          inputEle.setAttribute("name", "CalendarId");
        }
      } else {
        const targetInput = args.element.querySelector(".calendar-ddl input");
        if (targetInput && (targetInput as EJ2Instance).ej2_instances) {
          const calendarDDL: DropDownList = (targetInput as EJ2Instance).ej2_instances[0] as DropDownList;
          calendarDDL.dataSource = extend([], calendars, undefined, true) as Record<string, any>[];
          const selected = getSelectedCalendars();
          calendarDDL.value = args.data?.CalendarId || selected.ids[0] || calendars[0]?.id;
        }
      }
    } else if (args.type === "QuickInfo" && args.data && isNullOrUndefined(args.data.Id)) {
      args.cancel = true;
    }
  };

  const eventRendered = (args: EventRenderedArgs) => {
    if (!args || !args.element || !args.data) {
      return;
    }
    const selected = getSelectedCalendars();
    const idx = selected.ids.indexOf(args.data.CalendarId);
    const categoryColor: string = idx > -1 && selected.items[idx] ? selected.items[idx].color : '#2563eb';

    if (!categoryColor) {
      return;
    }
    if (scheduleObj.current?.currentView === 'Agenda') {
      if (args.element.firstChild) {
        (args.element.firstChild as HTMLElement).style.borderLeftColor = categoryColor;
      }
    } else {
      args.element.style.backgroundColor = categoryColor;
    }
  };

  const dialogContent = () => {
    return (
      <div className="dialogContent">
        <div>Calendar Name</div>
        <div className="dialog-content">
          <TextBoxComponent ref={calendarNameObj} id="text-box" placeholder="Enter calendar name" />
          <ColorPickerComponent ref={colorPickerObj} id="color-picker" />
        </div>
      </div>
    );
  };

  const dialogFooterTemplate = () => {
    return (
      <button id="saveButton" ref={saveButtonRef} className="e-control e-btn e-primary" data-ripple="true" onClick={updateTextValue}>Save</button>
    );
  };

  const unplannedSidebarClosed = () => {
    if (unPlannedSidebarObj.current?.element?.parentElement) {
      const unplannedElement: HTMLElement | null = unPlannedSidebarObj.current.element.parentElement.querySelector('.unplanned-container');
      if (unplannedElement) {
        unplannedElement.style.display = 'block';
      }
    }
  };

  const unplannedSideBarCreated = () => {
    if (unPlannedSidebarObj.current?.element?.parentElement) {
      const open: HTMLElement | null = unPlannedSidebarObj.current.element.parentElement.querySelector('#plannedOpen');
      const unplannedElement: HTMLElement | null = unPlannedSidebarObj.current.element.parentElement.querySelector('.unplanned-container');
      if (open) {
        open.onclick = (): void => {
          unPlannedSidebarObj.current?.show();
          const currentFiltered = getFilteredData();
          if (gridObj.current) {
            gridObj.current.dataSource = extend([], currentFiltered.unPlanned, undefined, true) as Record<string, any>[];
          }
          if (unplannedElement) {
            unplannedElement.style.display = 'none';
          }
        };
      }
    }
  };

  const unplannedSideBarCollapse = () => {
    if (unPlannedSidebarObj.current?.isOpen) {
      unPlannedSidebarObj.current.hide();
      if (unPlannedSidebarObj.current.element?.parentElement) {
        const unplannedElement: HTMLElement | null = unPlannedSidebarObj.current.element.parentElement.querySelector('.unplanned-container');
        if (unplannedElement) {
          unplannedElement.style.display = 'block';
        }
      }
    }
  };

  return (
    <div id="event-calendar-sample" className="control-section event-calendar-control-section">
      <div className="control-wrapper">
        <div>
          <ToolbarComponent ref={toolbarObj} id='toolbar' clicked={onToolbarItemClicked} cssClass="event-calendar-toolbar">
            <ItemsDirective>
              <ItemDirective tooltipText="Toggle Sidebar" prefixIcon="e-menu" cssClass='e-menu-btn' />
              <ItemDirective prefixIcon="e-chevron-left" tooltipText='Previous' cssClass='e-previous' />
              <ItemDirective prefixIcon="e-chevron-right" tooltipText='Next' cssClass='e-next' />
              <ItemDirective text={currentDate.toLocaleDateString()} cssClass='e-date-range' />
              <ItemDirective text="Create Event" align='Right' prefixIcon="e-plus" cssClass='e-create' />
              <ItemDirective type='Separator' align='Right' />
              <ItemDirective text='Today' align='Right' cssClass='e-today' />
              <ItemDirective type='Separator' align='Right' />
              <ItemDirective text='Day' align='Right' cssClass='e-day' />
              <ItemDirective text='Week' align='Right' cssClass='e-week' />
              <ItemDirective text='Month' align='Right' cssClass='e-month' />
              <ItemDirective text='Agenda' align='Right' cssClass='e-agenda' />
              <ItemDirective text='Timeline' align='Right' cssClass='e-timeline' />
              <ItemDirective text='Year' align='Right' cssClass='e-year' />
            </ItemsDirective>
          </ToolbarComponent>
        </div>

        <div className="main-content" id="main-text">
          <SidebarComponent
            id="sidebar-left"
            className="sidebar-treeview"
            ref={calendarSidebarObj}
            width={'300px'}
            height={'600px'}
            enableGestures={false}
            target={'.main-content'}
            isOpen={true}
          >
            <div className="table-content">
              <CalendarComponent ref={calendarObj} id="calendar" value={currentDate} change={valueChange} cssClass='selected-date-calendar' />
              <div className="calendar-list-container">
                <ListViewComponent
                  ref={calendarsListObj}
                  id='listview-def'
                  dataSource={calendars}
                  showCheckBox={true}
                  fields={{ id: 'id', text: 'name', isChecked: 'isSelected' }}
                  showHeader={true}
                  headerTemplate={listHeaderTemplate}
                  template={listTemplate}
                  select={onCalendarListChange}
                  actionComplete={onListActionComplete}
                />
              </div>
            </div>
          </SidebarComponent>

          <div className="sidebar-content flex-1">
            <div className="schedule-container">
              <ScheduleComponent
                id="Schedule"
                ref={scheduleObj}
                height='600px'
                selectedDate={currentDate}
                showHeaderBar={false}
                eventSettings={eventSettings}
                eventRendered={eventRendered}
                popupOpen={schedulePopupOpen}
                created={updateDateRange}
                actionComplete={onScheduleActionComplete}
              >
                <ResourcesDirective>
                  <ResourceDirective field='ResourceId' title='Employee' name='Resources' allowMultiple={true} dataSource={resourceData} textField='name' idField='id' colorField='color' />
                </ResourcesDirective>
                <ViewsDirective>
                  <ViewDirective option='Day' />
                  <ViewDirective option='Week' />
                  <ViewDirective option='Month' />
                  <ViewDirective option='Agenda' />
                  <ViewDirective option='TimelineMonth' group={{ resources: ['Resources'] }} />
                  <ViewDirective option='Year' />
                </ViewsDirective>
                <Inject services={[Day, Week, WorkWeek, Month, Agenda, TimelineMonth, Year, Resize, DragAndDrop]} />
              </ScheduleComponent>
            </div>

            <div className="unplanned-container">
              <div id="plannedOpen" className="e-icons e-chevron-left-double" title="View Unplanned Events"></div>
              <SidebarComponent
                ref={unPlannedSidebarObj}
                id="sidebar-right"
                position={'Right'}
                width={'300px'}
                enableGestures={false}
                target={'.main-content'}
                type="Push"
                isOpen={false}
                created={unplannedSideBarCreated}
                close={unplannedSidebarClosed}
              >
                <div id="unplanned-events-toolbar">
                  <button className="e-icons e-exit-full-screen" title="Close Sidebar" onClick={unplannedSideBarCollapse}></button>
                  <h4 id="headerText" className="font-semibold text-sm">Unplanned Events</h4>
                </div>
                <div className="unplanned-text-containers p-2">
                  <GridComponent ref={gridObj} dataSource={extend([], filteredData.unPlanned, undefined, true)}>
                    <ColumnsDirective>
                      <ColumnDirective field='Subject' headerText="Event / Request" width='140' textAlign="Left" isPrimaryKey={true} />
                      <ColumnDirective field='StartTime' headerText="Date" width='120' format={'dd MMM yyyy'} />
                    </ColumnsDirective>
                  </GridComponent>
                </div>
              </SidebarComponent>
            </div>
          </div>
        </div>

        <DialogComponent
          ref={dialogObj}
          id='dialog'
          className='calendar-edit-dialog'
          header={"New Calendar"}
          width={'340px'}
          content={dialogContent}
          footerTemplate={dialogFooterTemplate}
          showCloseIcon={true}
          isModal={true}
          animationSettings={{ effect: 'Zoom' }}
          visible={false}
        />
      </div>
    </div>
  );
};
