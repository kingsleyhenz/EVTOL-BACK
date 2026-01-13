export enum DeviceState {
  IDLE = "IDLE",
  LOADING = "LOADING",
  LOADED = "LOADED",
  DELIVERING = "DELIVERING",
  DELIVERED = "DELIVERED",
  RETURNING = "RETURNING"
}

export enum RequestStatus {
  PENDING = "Pending",
  ACCEPTED = "Accepted",
  REJECTED = "Rejected",
  CANCELED = "Canceled",
  IN_TRANSIT = "In Transit",
  DELIVERED = "Delivered"
}
