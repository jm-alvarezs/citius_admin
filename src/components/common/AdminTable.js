import React, { Component, Fragment } from "react";
import Input from "./Input";

class AdminTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResult: undefined,
    };
    this.searchRows = this.searchRows.bind(this);
  }

  searchRows(query) {
    if (!this.props.rows) return;
    if (isNaN(query)) query = query.toLowerCase();
    let searchResult = this.props.rows.filter((row) => {
      let result = Object.keys(row).filter((column) => {
        if (Array.isArray(row[column])) {
          return row[column].filter((subcolumn) => {
            if (isNaN(subcolumn)) {
              if (subcolumn.toLowerCase().startsWith(query)) return row;
            } else if (subcolumn === query) return row;
            return null;
          });
        }
        if (isNaN(row[column])) {
          if (row[column].toLowerCase().startsWith(query)) {
            return row;
          }
        } else if (row[column] === query) {
          return row;
        } else if (row[column] === Number(query)) {
          return row;
        }
        return null;
      });
      return result.length > 0;
    });
    this.setState({ searchResult });
  }

  renderHeaders() {
    if (this.props.headers)
      return (
        <thead>
          <tr>
            {this.props.headers.map((header, index) => (
              <th scope="col" key={index}>
                {header}
              </th>
            ))}
            {this.hasActions() && <th style={{ width: 150 }}>Acciones</th>}
          </tr>
        </thead>
      );
  }

  hasActions() {
    return (
      this.props.editRow || this.props.deleteRow || this.props.customActions
    );
  }

  renderColumns(row, isTotal) {
    return Object.keys(row).map((column, index) => {
      if (this.props.exclude) {
        if (this.props.exclude.includes(column)) return null;
      }
      if (column !== this.props.idRow || this.props.displayIdRow) {
        if (Array.isArray(row[column])) {
          return row[column].map((property, idx) => {
            if (this.props.editedRow)
              if (
                row[this.props.idRow] === this.props.editedRow[this.props.idRow]
              )
                return (
                  <td key={"col" + idx}>
                    <Input
                      type={
                        this.props.inputTypes
                          ? this.props.inputTypes[this.props.columnKey]
                            ? this.props.inputTypes[this.props.columnKey]
                            : !isNaN(property[this.props.columnKey])
                            ? "number"
                            : "text"
                          : !isNaN(property[this.props.columnKey])
                          ? "number"
                          : "text"
                      }
                      value={property[this.props.columnKey]}
                      modifier={this.props.inputModifier}
                      args={property[this.props.columnKey]}
                    />
                  </td>
                );
            return <td key={"col" + idx}>{property[this.props.columnKey]}</td>;
          });
        }
        if (this.props.editedRow) {
          if (
            this.props.editedRow[this.props.idRow] === row[this.props.idRow]
          ) {
            if (this.props.editables && this.props.editables !== null) {
              if (this.props.editables.includes(column)) {
                if (this.props.isEditable && this.props.isEditable !== null) {
                  if (this.props.isEditable(row)) {
                    return (
                      <td key={"col" + index}>
                        <Input
                          type={
                            this.props.inputTypes
                              ? this.props.inputTypes[column]
                                ? this.props.inputTypes[column]
                                : !isNaN(row[column])
                                ? "number"
                                : "text"
                              : !isNaN(row[column])
                              ? "number"
                              : "text"
                          }
                          value={this.props.editedRow[column]}
                          modifier={this.props.inputModifier}
                          args={[column, this.props.reducer]}
                        />
                      </td>
                    );
                  } else {
                    return (
                      <td key={"col-" + index}>
                        {row[column]}
                        {this.props.suffix && !isNaN(row[column])
                          ? this.props.suffix
                          : ""}
                      </td>
                    );
                  }
                }
                return (
                  <td key={"col" + index}>
                    <Input
                      type={
                        this.props.inputTypes
                          ? this.props.inputTypes[column]
                            ? this.props.inputTypes[column]
                            : !isNaN(row[column])
                            ? "number"
                            : "text"
                          : !isNaN(row[column])
                          ? "number"
                          : "text"
                      }
                      value={this.props.editedRow[column]}
                      modifier={this.props.inputModifier}
                      args={[column, this.props.reducer]}
                    />
                  </td>
                );
              } else {
                return (
                  <td key={"col-" + index}>
                    {row[column]}
                    {this.props.suffix && !isNaN(row[column])
                      ? this.props.suffix
                      : ""}
                  </td>
                );
              }
            }
            if (this.props.components) {
              if (this.props.components[column]) {
                const CustomComponent = this.props.components[column];
                return (
                  <td key={"col" + index}>
                    <CustomComponent {...row} {...this.props.editedRow} />
                  </td>
                );
              }
            }
            return (
              <td key={"col" + index}>
                <Input
                  type={
                    this.props.inputTypes
                      ? this.props.inputTypes[column]
                        ? this.props.inputTypes[column]
                        : !isNaN(row[column])
                        ? "number"
                        : "text"
                      : !isNaN(row[column])
                      ? "number"
                      : "text"
                  }
                  value={this.props.editedRow[column]}
                  modifier={this.props.inputModifier}
                  args={[column, this.props.reducer]}
                />
              </td>
            );
          }
        }
        if (this.props.editMode && !isTotal) {
          if (
            !this.props.excludeEditMode ||
            !this.props.excludeEditMode.includes(column)
          ) {
            if (this.props.components) {
              if (this.props.components[column]) {
                const CustomComponent = this.props.components[column];
                return (
                  <td>
                    <CustomComponent {...row} />
                  </td>
                );
              }
            }
            return (
              <td key={"col" + index}>
                <Input
                  type={
                    this.props.inputTypes
                      ? this.props.inputTypes[column]
                        ? this.props.inputTypes[column]
                        : !isNaN(row[column])
                        ? "number"
                        : "text"
                      : !isNaN(row[column])
                      ? "number"
                      : "text"
                  }
                  value={row[column]}
                  modifier={this.props.inputModifier}
                  args={[row[this.props.idRow], column, this.props.reducer]}
                />
              </td>
            );
          }
        }
        if (this.props.components) {
          if (this.props.components[column]) {
            const CustomComponent = this.props.components[column];
            return (
              <td key={`col-${index}`}>
                <CustomComponent {...this.props} {...row} />
              </td>
            );
          }
        }
        return (
          <td key={"col-" + index}>
            {this.props.iconsEstado &&
              (column === "activo" ||
                column === "estado" ||
                typeof row[column] === "boolean") &&
              (row[column] === true || row[column] === 1 ? (
                <i
                  className="far fa-check-circle"
                  style={{ color: "rgb(106, 217, 149)" }}
                ></i>
              ) : (
                <i
                  className="far fa-times-circle"
                  style={{ color: "rgb(236, 75, 63)" }}
                ></i>
              ))}
            {this.props.archivoOnClick && column === "nombre" ? (
              <button
                className="text-dark btn btn-link"
                onClick={() => this.props.archivoOnClick(row)}
              >
                {row[column]}
              </button>
            ) : column === "cantidad" && row[column] === 0 ? (
              "Ilimitado"
            ) : (
              row[column]
            )}
            {this.props.suffix && !isNaN(row[column]) ? this.props.suffix : ""}
          </td>
        );
      }
      return null;
    });
  }

  isEditable(row) {
    if (this.props.isEditable && this.props.isEditable !== null) {
      return this.props.isEditable(row);
    }
    return true;
  }

  renderActions(row) {
    if (this.props.editedRow) {
      if (this.props.editedRow[this.props.idRow] === row[this.props.idRow])
        return (
          <td>
            <button
              className="btn btn-outline-success"
              onClick={() =>
                this.props.saveRow(this.props.editedRow, this.props.reducer)
              }
            >
              Guardar
            </button>
          </td>
        );
    }
    return (
      <td>
        {this.props.editRow && this.isEditable(row) && (
          <button
            variant="link"
            className="text-accent btn btn-link"
            onClick={() => this.props.editRow(row, this.props.reducer)}
          >
            <i
              className="fa fa-edit"
              style={{
                color: this.props.editColor ? this.props.editColor : "",
              }}
            />
          </button>
        )}
        {this.props.deleteRow && this.props.confirm && this.isEditable(row) ? (
          <button
            className="text-danger btn btn-link"
            onClick={() => {
              this.props.confirm(
                `¿Está seguro que desea eliminar el ${this.props.rowName} ${
                  row[this.props.nameCol]
                }? ${this.props.consequence ? this.props.consequence : ""}`,
                () => this.props.deleteRow(row, this.props.reducer)
              );
            }}
          >
            <i className="fa fa-trash" />
          </button>
        ) : (
          this.props.deleteRow &&
          this.isEditable(row) && (
            <button
              className="text-danger btn btn-link"
              onClick={() => this.props.deleteRow(row)}
            >
              <i className="fa fa-trash" />
            </button>
          )
        )}
        {this.props.customActions &&
          this.props.customActions.map((action, index) => {
            return (
              <button
                key={index}
                className={action.className + " btn btn-link"}
                onClick={() => action.action(row)}
              >
                <i className={action.icon}></i>
              </button>
            );
          })}
      </td>
    );
  }

  renderRows() {
    let rowsToRender;
    if (this.state.searchResult) {
      rowsToRender = this.state.searchResult;
    } else if (this.props.rows) {
      rowsToRender = this.props.rows;
    }
    if (!rowsToRender) return <></>;
    const sumRow = {};
    if (this.props.sumRows && rowsToRender.length > 0) {
      this.props.rows.forEach((row) => {
        Object.keys(row).forEach((column) => {
          if (!this.props.exclude.includes(column)) {
            if (sumRow[column]) sumRow[column] += Number(row[column]);
            else sumRow[column] = Number(row[column]);
          }
        });
      });
    }
    sumRow.nombre = "Total";
    return (
      <tbody>
        {rowsToRender.map((row, index) => {
          return (
            <tr
              key={"row" + index}
              onClick={
                this.props.viewRow
                  ? () => this.props.viewRow(row[this.props.idRow])
                  : () => {}
              }
              className={this.props.viewRow ? "pointer-cursor" : ""}
            >
              {this.renderColumns(row)}
              {this.hasActions() ? this.renderActions(row) : <></>}
            </tr>
          );
        })}
        {this.props.sumRows && (
          <tr
            className={
              (this.props.viewRow ? "pointer-cursor" : "") + " total-row"
            }
          >
            {this.renderColumns(sumRow, true)}
          </tr>
        )}
      </tbody>
    );
  }

  renderSearchBox() {
    if (this.props.searchBox)
      return (
        <input
          onChange={(e) => this.searchRows(e.target.value)}
          placeholder={this.props.placeholder}
        />
      );
  }

  render() {
    return (
      <Fragment>
        {this.renderSearchBox()}
        <div className="table-responsive">
          <table className="table table-hover">
            {this.renderHeaders()}
            {this.renderRows()}
          </table>
        </div>
      </Fragment>
    );
  }
}

export default AdminTable;
