{
    async function updateTable(rootElement) {
        
        const table = rootElement.querySelector('.random-table__table');
        const tableHead = table.querySelector('thead tr');
        const tableBody =  table.querySelector('tbody');
        const button = rootElement.querySelector('.random-table__button');
        const label = rootElement.querySelector('.random-table__label');

        // Spin the button
        button .classList.add('random-table__button--updating');

        const response = await fetch(rootElement.dataset.url);
        const data = await response.json();

        // Clear table
        tableHead.innerHTML = "";
        tableBody.innerHTML = "";
        

        // Populate header
        for (let i = 0; i < data.headers.length; i++) {
            const headerCellElement = document.createElement('th');
            headerCellElement.innerHTML = data.headers[i];
            tableHead.append(headerCellElement);
        }

        // Populate body
        for (let i = 0; i < data.rows.length; i++) {

            const row = data.rows[i];
            const rowElement = document.createElement('tr');

            for (let j = 0; j < row.length; j++) {

                const rowCellElement = document.createElement('td');
                rowCellElement.innerHTML = row[j];
                rowElement.append(rowCellElement);
            }

            tableBody.append(rowElement);
        }

        // Populate last update label
        label.textContent = `Last update: ${new Date(data.lastUpdate).toLocaleTimeString()}`;

        // Unspin the button
        button.classList.remove('random-table__button--updating');

    }

    function createOptions(rootElement) {

        // Label
        const label = document.createElement('span');
        label.classList.add('random-table__label');
        label.innerHTML = 'Last update: Anno Domini';

        // Button
        const button = document.createElement('button');
        button.classList.add('random-table__button');
        button.type = 'button';
        const icon = document.createElement('i');
        icon.classList.add('material-icons');
        icon.innerHTML = 'refresh';
        button.append(icon);

        rootElement.append(label, button);
    }

    function createTable(rootElement) {

        const table = document.createElement('table');
        table.classList.add('random-table__table');

        // Head
        const tableHead = document.createElement('thead');
        const tableHeadRow = document.createElement('tr');
        tableHead.append(tableHeadRow);

        // Body
        const tableBody = document.createElement('tbody');
        const tableBodyRow = document.createElement('tr');
        const tableBodyRowCell = document.createElement('td');
        // Add a cell indicating that the table is loading...
        tableBodyRowCell.textContent = 'Loading table...';
        tableBodyRow.append(tableBodyRowCell);
        tableBody.append(tableBodyRow);

        table.append(tableHead, tableBody);

        const options = document.createElement('div');
        options.classList.add('random-table__options');
        createOptions(options);

        rootElement.append(table, options);
    }

    function setupTables(tableContainers) {
    
        for (let i = 0; i < tableContainers.length; i++) {

            const tableContainer = tableContainers[i];
            createTable(tableContainer);

            // Add update event listener
            const updateButton = tableContainer.querySelector('.random-table__button');
            updateButton.addEventListener('click', () => {
                updateTable(tableContainer);
            });

            updateTable(tableContainer);
            updateButton.classList.remove('random-table__button--updating');
        }
    }

}

document.addEventListener('DOMContentLoaded', () => {
    const tableContainers = document.querySelectorAll('.random-table[data-url]');
    setupTables(tableContainers);
})