class ApiResponse<T> {
  statusCode: number;
  data: T | null;
  message: string;
  success: boolean;
  errors?: unknown;

  constructor(
    statusCode: number = 200,
    data: T | null = null,
    message: string = "Success",
    errors?: unknown
  ) {
    this.statusCode = statusCode;
    this.data = data;
    this.message = message;
    this.errors = errors;
    this.success = statusCode < 400;
  }

  static success<T>(data: T, message: string = "Success"): ApiResponse<T> {
    return new ApiResponse<T>(200, data, message);
  }

  static error(
    message: string = "Error",
    statusCode: number = 500,
    errors?: unknown
  ): ApiResponse<null> {
    return new ApiResponse<null>(statusCode, null, message, errors);
  }

  toJSON() {
    return {
      statusCode: this.statusCode,
      data: this.data,
      message: this.message,
      success: this.success,
      errors: this.errors,
    };
  }
}

export { ApiResponse };
