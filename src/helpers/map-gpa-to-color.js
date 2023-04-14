function mapGpaToColor(gpa) {
    // Set the minimum and maximum GPA values
    const minGpa = 0.0;
    const maxGpa = 4.0;
    // Map the GPA score to a value between 0 and 1
    const value = (gpa - minGpa) / (maxGpa - minGpa);
    // Calculate the RGB values for the color gradient based on the value
    const red = value < 0.5 ? 205 : Math.round(255 - (value - 0.5) * 2 * 205);
    const green = value > 0.5 ? 205 : Math.round(value * 2 * 205);
    const blue = 32;
    // Convert the RGB values to a hexadecimal color code
    const color = '#' + ((1 << 24) + (red << 16) + (green << 8) + blue).toString(16).slice(1);
    return color;
  }

  export default mapGpaToColor;