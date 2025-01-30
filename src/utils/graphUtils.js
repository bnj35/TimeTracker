export function getLabels(data) {
    console.log(data.labels);
    return data.labels;
}

export function getDatasetData(dataset) {
    console.log(dataset.data);
    return dataset.data;
}

export async function insertActivitiesList(labels) {
    try {
        const activitiesList = document.getElementById('activities_list');
        labels.forEach(label => {

            const activity = document.createElement('div');
            activity.innerHTML = label;
            activitiesList.appendChild(activity);
        });

        return true;
    } catch (error) {
        throw new Error('Erreur lors de l\'insertion des activités dans le graphique.');
    }

}

export async function insertDatasetsData(dataset_data) {
    try {
        const activitiesList = document.getElementById('activities_list');
        const activities = document.querySelectorAll('#activities_list div');

        activities.forEach((activity, index) => {
            const data = document.createElement('span');
            data.innerHTML = ' -' + dataset_data[index] + ' minutes passés sur ce projet';
            activity.appendChild(data);
        });

        return true;
    } catch (error) {
        throw new Error('Erreur lors de l\'insertion des données dans le graphique.');
    }
}