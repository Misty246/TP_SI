// ==========================================
// 1. DONNEES DE L'APPLICATION
// ==========================================

let machines = [];
let variables = [];

let readings = [];
let chart = null;
let currentPage = "dashboard";
const API_BASE = window.API_BASE_URL ||
    `http://${window.location.hostname || "localhost"}:3000/api`;

let currentTheme = localStorage.getItem("industriaTheme") || "dark";
let currentLanguage = localStorage.getItem("industriaLanguage") || "fr";

const machineModal = () =>
    bootstrap.Modal.getOrCreateInstance(document.getElementById("machineModal"));

const variableModal = () =>
    bootstrap.Modal.getOrCreateInstance(document.getElementById("variableModal"));


// ==========================================
// 2. TRADUCTIONS
// ==========================================

const translations = {

    fr: {
        workspace: "ESPACE DE TRAVAIL",
        dashboard: "Dashboard",
        configuration: "Paramétrage",
        preferences: "Paramètres",
        systemOperational: "Système opérationnel",
        prototype: "Prototype de supervision v1.0",
        openSource: "Solution open source",
        supervisionActive: "SUPERVISION ACTIVE",
        technician: "Technicien",
        overview: "Vue d'ensemble · Supervision",
        dashboardTitle: "Dashboard process",
        dashboardSubtitle: "Suivez les performances de vos installations en temps réel.",
        exportPng: "Export PNG",
        exportCsv: "Export CSV",
        supervisionFilters: "Filtres de supervision",
        filterSubtitle: "Choisissez les équipements et les données à afficher.",
        filters: "FILTRES",
        machine: "Automate",
        allMachines: "Tous les automates",
        monitoredVariable: "Variable surveillée",
        allVariables: "Toutes les variables",
        period: "Période",
        last24Hours: "Dernières 24 heures",
        last7Days: "7 derniers jours",
        last30Days: "30 derniers jours",
        reset: "Réinitialiser",
        lastMeasurement: "Dernière mesure",
        latestValue: "Valeur la plus récente",
        averageValue: "Valeur moyenne",
        selectedPeriod: "Sur la période sélectionnée",
        minimumValue: "Valeur minimale",
        maximumValue: "Valeur maximale",
        variableEvolution: "Évolution des variables",
        historySubtitle: "Historique des mesures enregistré par le backend",
        live: "EN DIRECT",
        demoData: "Les données affichées sont des données de démonstration.",
        latestReadings: "Derniers relevés",
        timestampedData: "Données historisées avec horodatage",
        downloadData: "Télécharger les données",
        timestamp: "Horodatage",
        variable: "Variable",
        value: "Valeur",
        unit: "Unité",
        state: "État",
        equipmentConfiguration: "Configuration · Équipements",
        configurationSubtitle: "Configurez les automates et les variables à surveiller.",
        addMachine: "Ajouter un automate",
        configuredMachines: "Automates configurés",
        connectedEquipment: "Équipements connectés au système",
        monitoredVariables: "Variables surveillées",
        registerDescription: "Définissez les registres et fréquences de lecture",
        add: "Ajouter",
        register: "Registre",
        frequency: "Fréquence",
        aboutConfiguration: "À propos de la configuration",
        configurationInfo: "Les automates et variables affichés sont chargés depuis la base de données et enregistrés via l'API REST du backend.",
        personalization: "Personnalisation",
        preferencesSubtitle: "Personnalisez l'apparence et la langue de votre interface.",
        appearance: "Apparence",
        appearanceDescription: "Choisissez le thème visuel de l'application.",
        interfaceTheme: "Thème de l'interface",
        darkTheme: "Sombre",
        lightTheme: "Clair",
        kawaiiTheme: "🌸 Kawaii rose",
        language: "Langue",
        languageDescription: "Sélectionnez la langue de l'interface.",
        interfaceLanguage: "Langue de l'interface",
        preferencesInfoTitle: "Préférences enregistrées",
        preferencesInfo: "Vos choix sont automatiquement sauvegardés dans votre navigateur et seront conservés lors de vos prochaines visites.",
        machineName: "Nom de l'automate",
        ipAddress: "Adresse IP",
        cancel: "Annuler",
        save: "Enregistrer",
        variableName: "Nom de la variable",
        associatedMachine: "Automate associé",
        registerAddress: "Registre / adresse",
        dataType: "Type de donnée",
        frequencySeconds: "Fréquence (secondes)",
        normal: "Normal",
        active: "Actif",
        inactive: "Inactif",
        noReadings: "Aucun relevé pour ces filtres.",
        noMachine: "Aucun automate configuré.",
        noVariable: "Aucune variable configurée.",
        deletedMachine: "Automate supprimé",
        deletedVariable: "Variable supprimée",
        unknownMachine: "Automate supprimé",
        variableFallback: "Variable",
        equipment: "équipement(s)",
        second: "s",
        addMachineTitle: "Ajouter un automate",
        editMachineTitle: "Modifier un automate",
        addVariableTitle: "Ajouter une variable",
        editVariableTitle: "Modifier une variable",
        completeFields: "Veuillez compléter les champs",
        machineSaved: "Automate enregistré",
        variableSaved: "Variable enregistrée",
        machineDeleteConfirm: "Supprimer cet automate et ses variables associées ?",
        variableDeleteConfirm: "Supprimer cette variable et son historique ?",
        addMachineFirst: "Ajoutez d’abord un automate",
        machineDeleted: "Automate supprimé",
        variableDeleted: "Variable supprimée",
        surveillanceEnabled: "Surveillance activée",
        surveillanceDisabled: "Surveillance désactivée",
        csvDownloaded: "Export CSV téléchargé",
        chartExported: "Graphique exporté en PNG",
        actionDone: "Action réalisée"
    },

    en: {
        workspace: "WORKSPACE",
        dashboard: "Dashboard",
        configuration: "Configuration",
        preferences: "Settings",
        systemOperational: "System operational",
        prototype: "Monitoring prototype v1.0",
        openSource: "Open source solution",
        supervisionActive: "MONITORING ACTIVE",
        technician: "Technician",
        overview: "Overview · Monitoring",
        dashboardTitle: "Process dashboard",
        dashboardSubtitle: "Monitor your installations' performance in real time.",
        exportPng: "Export PNG",
        exportCsv: "Export CSV",
        supervisionFilters: "Monitoring filters",
        filterSubtitle: "Choose the equipment and data to display.",
        filters: "FILTERS",
        machine: "PLC",
        allMachines: "All PLCs",
        monitoredVariable: "Monitored variable",
        allVariables: "All variables",
        period: "Period",
        last24Hours: "Last 24 hours",
        last7Days: "Last 7 days",
        last30Days: "Last 30 days",
        reset: "Reset",
        lastMeasurement: "Last measurement",
        latestValue: "Most recent value",
        averageValue: "Average value",
        selectedPeriod: "For the selected period",
        minimumValue: "Minimum value",
        maximumValue: "Maximum value",
        variableEvolution: "Variable trends",
        historySubtitle: "Measurement history saved by the backend",
        live: "LIVE",
        demoData: "The displayed data is for demonstration purposes.",
        latestReadings: "Latest readings",
        timestampedData: "Historical data with timestamps",
        downloadData: "Download data",
        timestamp: "Timestamp",
        variable: "Variable",
        value: "Value",
        unit: "Unit",
        state: "Status",
        equipmentConfiguration: "Configuration · Equipment",
        configurationSubtitle: "Configure PLCs and monitored variables.",
        addMachine: "Add a PLC",
        configuredMachines: "Configured PLCs",
        connectedEquipment: "Equipment connected to the system",
        monitoredVariables: "Monitored variables",
        registerDescription: "Define registers and reading frequencies",
        add: "Add",
        register: "Register",
        frequency: "Frequency",
        aboutConfiguration: "About configuration",
        configurationInfo: "PLCs and variables are loaded from the database and saved through the backend REST API.",
        personalization: "Personalization",
        preferencesSubtitle: "Customize the appearance and language of your interface.",
        appearance: "Appearance",
        appearanceDescription: "Choose the application's visual theme.",
        interfaceTheme: "Interface theme",
        darkTheme: "Dark",
        lightTheme: "Light",
        kawaiiTheme: "🌸 Pink kawaii",
        language: "Language",
        languageDescription: "Select the interface language.",
        interfaceLanguage: "Interface language",
        preferencesInfoTitle: "Saved preferences",
        preferencesInfo: "Your choices are automatically saved in your browser and will be retained for your next visits.",
        machineName: "PLC name",
        ipAddress: "IP address",
        cancel: "Cancel",
        save: "Save",
        variableName: "Variable name",
        associatedMachine: "Associated PLC",
        registerAddress: "Register / address",
        dataType: "Data type",
        frequencySeconds: "Frequency (seconds)",
        normal: "Normal",
        active: "Active",
        inactive: "Inactive",
        noReadings: "No readings for these filters.",
        noMachine: "No PLC configured.",
        noVariable: "No variable configured.",
        deletedMachine: "Deleted PLC",
        deletedVariable: "Deleted variable",
        unknownMachine: "Deleted PLC",
        variableFallback: "Variable",
        equipment: "equipment(s)",
        second: "s",
        addMachineTitle: "Add a PLC",
        editMachineTitle: "Edit a PLC",
        addVariableTitle: "Add a variable",
        editVariableTitle: "Edit a variable",
        completeFields: "Please fill in all fields",
        machineSaved: "PLC saved",
        variableSaved: "Variable saved",
        machineDeleteConfirm: "Delete this PLC and its associated variables?",
        variableDeleteConfirm: "Delete this variable and its history?",
        addMachineFirst: "Add a PLC first",
        machineDeleted: "PLC deleted",
        variableDeleted: "Variable deleted",
        surveillanceEnabled: "Monitoring enabled",
        surveillanceDisabled: "Monitoring disabled",
        csvDownloaded: "CSV export downloaded",
        chartExported: "Chart exported as PNG",
        actionDone: "Action completed"
    },

    zh: {
        workspace: "工作空间",
        dashboard: "仪表盘",
        configuration: "设备配置",
        preferences: "设置",
        systemOperational: "系统运行正常",
        prototype: "监控原型 v1.0",
        openSource: "开源解决方案",
        supervisionActive: "监控已启用",
        technician: "技术人员",
        overview: "概览 · 监控",
        dashboardTitle: "工艺仪表盘",
        dashboardSubtitle: "实时监控设备运行性能。",
        exportPng: "导出 PNG",
        exportCsv: "导出 CSV",
        supervisionFilters: "监控筛选",
        filterSubtitle: "选择要显示的设备和数据。",
        filters: "筛选",
        machine: "PLC 控制器",
        allMachines: "所有控制器",
        monitoredVariable: "监控变量",
        allVariables: "所有变量",
        period: "时间范围",
        last24Hours: "最近 24 小时",
        last7Days: "最近 7 天",
        last30Days: "最近 30 天",
        reset: "重置",
        lastMeasurement: "最新测量值",
        latestValue: "最近的数值",
        averageValue: "平均值",
        selectedPeriod: "所选时间范围",
        minimumValue: "最小值",
        maximumValue: "最大值",
        variableEvolution: "变量变化趋势",
        historySubtitle: "由后端保存的测量历史",
        live: "实时",
        demoData: "显示的数据仅用于演示。",
        latestReadings: "最新记录",
        timestampedData: "带时间戳的历史数据",
        downloadData: "下载数据",
        timestamp: "时间戳",
        variable: "变量",
        value: "数值",
        unit: "单位",
        state: "状态",
        equipmentConfiguration: "配置 · 设备",
        configurationSubtitle: "配置控制器和监控变量。",
        addMachine: "添加控制器",
        configuredMachines: "已配置的控制器",
        connectedEquipment: "连接到系统的设备",
        monitoredVariables: "监控变量",
        registerDescription: "设置寄存器和读取频率",
        add: "添加",
        register: "寄存器",
        frequency: "频率",
        aboutConfiguration: "关于配置",
        configurationInfo: "控制器和变量从数据库加载，并通过后端 REST API 保存。",
        personalization: "个性化",
        preferencesSubtitle: "自定义界面的外观和语言。",
        appearance: "外观",
        appearanceDescription: "选择应用程序的视觉主题。",
        interfaceTheme: "界面主题",
        darkTheme: "深色",
        lightTheme: "浅色",
        kawaiiTheme: "🌸 粉色可爱风",
        language: "语言",
        languageDescription: "选择界面语言。",
        interfaceLanguage: "界面语言",
        preferencesInfoTitle: "已保存的偏好设置",
        preferencesInfo: "您的选择会自动保存在浏览器中，下次访问时仍然有效。",
        machineName: "控制器名称",
        ipAddress: "IP 地址",
        cancel: "取消",
        save: "保存",
        variableName: "变量名称",
        associatedMachine: "关联控制器",
        registerAddress: "寄存器 / 地址",
        dataType: "数据类型",
        frequencySeconds: "频率（秒）",
        normal: "正常",
        active: "启用",
        inactive: "停用",
        noReadings: "没有符合筛选条件的记录。",
        noMachine: "尚未配置控制器。",
        noVariable: "尚未配置变量。",
        deletedMachine: "已删除的控制器",
        deletedVariable: "已删除的变量",
        unknownMachine: "已删除的控制器",
        variableFallback: "变量",
        equipment: "台设备",
        second: "秒",
        addMachineTitle: "添加控制器",
        editMachineTitle: "编辑控制器",
        addVariableTitle: "添加变量",
        editVariableTitle: "编辑变量",
        completeFields: "请填写所有字段",
        machineSaved: "控制器已保存",
        variableSaved: "变量已保存",
        machineDeleteConfirm: "确定删除此控制器及其关联变量吗？",
        variableDeleteConfirm: "确定删除此变量及其历史记录吗？",
        addMachineFirst: "请先添加控制器",
        machineDeleted: "控制器已删除",
        variableDeleted: "变量已删除",
        surveillanceEnabled: "监控已启用",
        surveillanceDisabled: "监控已停用",
        csvDownloaded: "CSV 文件已下载",
        chartExported: "图表已导出为 PNG",
        actionDone: "操作已完成"
    },

    es: {
        workspace: "ESPACIO DE TRABAJO",
        dashboard: "Panel",
        configuration: "Configuración",
        preferences: "Ajustes",
        systemOperational: "Sistema operativo",
        prototype: "Prototipo de supervisión v1.0",
        openSource: "Solución de código abierto",
        supervisionActive: "SUPERVISIÓN ACTIVA",
        technician: "Técnico",
        overview: "Vista general · Supervisión",
        dashboardTitle: "Panel de proceso",
        dashboardSubtitle: "Supervise el rendimiento de sus instalaciones en tiempo real.",
        exportPng: "Exportar PNG",
        exportCsv: "Exportar CSV",
        supervisionFilters: "Filtros de supervisión",
        filterSubtitle: "Seleccione los equipos y los datos que desea mostrar.",
        filters: "FILTROS",
        machine: "Autómata",
        allMachines: "Todos los autómatas",
        monitoredVariable: "Variable supervisada",
        allVariables: "Todas las variables",
        period: "Periodo",
        last24Hours: "Últimas 24 horas",
        last7Days: "Últimos 7 días",
        last30Days: "Últimos 30 días",
        reset: "Restablecer",
        lastMeasurement: "Última medición",
        latestValue: "Valor más reciente",
        averageValue: "Valor medio",
        selectedPeriod: "Durante el periodo seleccionado",
        minimumValue: "Valor mínimo",
        maximumValue: "Valor máximo",
        variableEvolution: "Evolución de las variables",
        historySubtitle: "Historial de mediciones guardado por el backend",
        live: "EN DIRECTO",
        demoData: "Los datos mostrados son datos de demostración.",
        latestReadings: "Últimas lecturas",
        timestampedData: "Datos históricos con fecha y hora",
        downloadData: "Descargar datos",
        timestamp: "Fecha y hora",
        variable: "Variable",
        value: "Valor",
        unit: "Unidad",
        state: "Estado",
        equipmentConfiguration: "Configuración · Equipos",
        configurationSubtitle: "Configure los autómatas y las variables que desea supervisar.",
        addMachine: "Añadir autómata",
        configuredMachines: "Autómatas configurados",
        connectedEquipment: "Equipos conectados al sistema",
        monitoredVariables: "Variables supervisadas",
        registerDescription: "Defina los registros y las frecuencias de lectura",
        add: "Añadir",
        register: "Registro",
        frequency: "Frecuencia",
        aboutConfiguration: "Acerca de la configuración",
        configurationInfo: "Los autómatas y variables se cargan desde la base de datos y se guardan mediante la API REST del backend.",
        personalization: "Personalización",
        preferencesSubtitle: "Personalice la apariencia y el idioma de su interfaz.",
        appearance: "Apariencia",
        appearanceDescription: "Elija el tema visual de la aplicación.",
        interfaceTheme: "Tema de la interfaz",
        darkTheme: "Oscuro",
        lightTheme: "Claro",
        kawaiiTheme: "🌸 Kawaii rosa",
        language: "Idioma",
        languageDescription: "Seleccione el idioma de la interfaz.",
        interfaceLanguage: "Idioma de la interfaz",
        preferencesInfoTitle: "Preferencias guardadas",
        preferencesInfo: "Sus opciones se guardan automáticamente en el navegador y se conservarán en sus próximas visitas.",
        machineName: "Nombre del autómata",
        ipAddress: "Dirección IP",
        cancel: "Cancelar",
        save: "Guardar",
        variableName: "Nombre de la variable",
        associatedMachine: "Autómata asociado",
        registerAddress: "Registro / dirección",
        dataType: "Tipo de dato",
        frequencySeconds: "Frecuencia (segundos)",
        normal: "Normal",
        active: "Activo",
        inactive: "Inactivo",
        noReadings: "No hay lecturas para estos filtros.",
        noMachine: "No hay autómatas configurados.",
        noVariable: "No hay variables configuradas.",
        deletedMachine: "Autómata eliminado",
        deletedVariable: "Variable eliminada",
        unknownMachine: "Autómata eliminado",
        variableFallback: "Variable",
        equipment: "equipo(s)",
        second: "s",
        addMachineTitle: "Añadir un autómata",
        editMachineTitle: "Modificar un autómata",
        addVariableTitle: "Añadir una variable",
        editVariableTitle: "Modificar una variable",
        completeFields: "Por favor, complete todos los campos",
        machineSaved: "Autómata guardado",
        variableSaved: "Variable guardada",
        machineDeleteConfirm: "¿Eliminar este autómata y sus variables asociadas?",
        variableDeleteConfirm: "¿Eliminar esta variable y su historial?",
        addMachineFirst: "Añada primero un autómata",
        machineDeleted: "Autómata eliminado",
        variableDeleted: "Variable eliminada",
        surveillanceEnabled: "Supervisión activada",
        surveillanceDisabled: "Supervisión desactivada",
        csvDownloaded: "Archivo CSV descargado",
        chartExported: "Gráfico exportado como PNG",
        actionDone: "Acción realizada"
    }
};


// ==========================================
// 3. FONCTION DE TRADUCTION
// ==========================================

function t(key) {
    return translations[currentLanguage]?.[key]
        || translations.fr[key]
        || key;
}

function applyLanguage() {
    document.documentElement.lang = currentLanguage;

    document.querySelectorAll("[data-i18n]").forEach(element => {
        const key = element.dataset.i18n;
        if (t(key)) element.textContent = t(key);
    });

    document.getElementById("languageSelector").value = currentLanguage;

    // Actualisation des textes dépendants de la langue
    populateMachineFilter();
    updateVariableOptions();

    if (currentPage === "dashboard") {
        renderDashboard();
    }

    if (currentPage === "settings") {
        renderSettings();
    }

    if (currentPage === "preferences") {
        document.getElementById("breadcrumb").textContent = t("preferences");
    } else {
        document.getElementById("breadcrumb").textContent =
            currentPage === "dashboard" ? t("dashboard") : t("configuration");
    }
}

function changeLanguage(language) {
    if (!translations[language]) return;

    currentLanguage = language;
    localStorage.setItem("industriaLanguage", language);

    applyLanguage();
    notify(t("actionDone"));
}


// ==========================================
// 4. GESTION DU THEME
// ==========================================

function applyTheme() {
    document.documentElement.setAttribute("data-theme", currentTheme);
    document.getElementById("themeSelector").value = currentTheme;

    // Actualise les couleurs du graphique sans changer ses données
    if (chart) {
        const styles = getComputedStyle(document.documentElement);
        const textColor = styles.getPropertyValue("--chart-text").trim();
        const gridColor = styles.getPropertyValue("--grid").trim();

        chart.options.plugins.legend.labels.color = textColor;
        chart.options.scales.x.ticks.color = textColor;
        chart.options.scales.y.ticks.color = textColor;
        chart.options.scales.x.grid.color = gridColor;
        chart.options.scales.y.grid.color = gridColor;
        chart.options.plugins.tooltip.backgroundColor = currentTheme === "dark"
            ? "#0b1926"
            : currentTheme === "kawaii" ? "#fff0f6" : "#ffffff";
        chart.options.plugins.tooltip.borderColor = currentTheme === "dark"
            ? "#355064"
            : currentTheme === "kawaii" ? "#edb1ca" : "#d5e0e9";
        chart.options.plugins.tooltip.titleColor = currentTheme === "dark" ? "#fff" : "#542f43";
        chart.options.plugins.tooltip.bodyColor = currentTheme === "dark" ? "#cbd8e2" : "#654357";

        chart.update();
    }
}

function changeTheme(theme) {
    if (!["dark", "light", "kawaii"].includes(theme)) return;

    currentTheme = theme;
    localStorage.setItem("industriaTheme", theme);

    applyTheme();
    renderDashboard();
    notify(t("actionDone"));
}


// ==========================================
// 5. INITIALISATION DES PREFERENCES
// ==========================================

function initializePreferences() {
    if (!translations[currentLanguage]) {
        currentLanguage = "fr";
    }

    if (!["dark", "light", "kawaii"].includes(currentTheme)) {
        currentTheme = "dark";
    }

    applyTheme();
    applyLanguage();
}


// ==========================================
// 6. CONNEXION A L'API BACKEND
// ==========================================

async function apiRequest(path, options = {}) {
    const response = await fetch(`${API_BASE}${path}`, {
        ...options,
        headers: {
            ...(options.body ? { "Content-Type": "application/json" } : {}),
            ...options.headers
        }
    });
    const text = await response.text();
    const result = text ? JSON.parse(text) : null;

    if (!response.ok) {
        throw new Error(result?.error || `Erreur API (${response.status})`);
    }

    return result;
}

function setApiStatus(connected) {
    const status = document.getElementById("apiStatus");
    const indicator = status.previousElementSibling;
    status.textContent = connected ? "Backend connecté" : "Backend indisponible";
    status.style.color = connected ? "#59dcb0" : "#ff7882";
    indicator.style.background = connected ? "#35d39a" : "#ff6b75";
    indicator.style.boxShadow = connected
        ? "0 0 10px #35d39a"
        : "0 0 10px #ff6b75";
}

function escapeHtml(value) {
    return String(value ?? "").replace(/[&<>"']/g, character => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
    })[character]);
}

async function loadBackendData(showError = true) {
    try {
        const [machineRows, variableRows, historyRows] = await Promise.all([
            apiRequest("/machines"),
            apiRequest("/variables"),
            apiRequest("/historique")
        ]);

        machines = machineRows.map(machine => ({
            id: Number(machine.id),
            name: machine.nom,
            ip: machine.ip_address,
            protocol: machine.protocol
        }));

        variables = variableRows.map(variable => ({
            id: Number(variable.id),
            machineId: Number(variable.machine_id),
            name: variable.nom,
            register: variable.adresse_memoire,
            unit: variable.unite || "",
            type: variable.type_var,
            frequency: Number(variable.frequence_acquisition),
            active: true
        }));

        readings = historyRows.map(reading => ({
            id: Number(reading.id),
            variableId: Number(reading.variable_id),
            machineId: variables.find(variable => variable.id === Number(reading.variable_id))?.machineId,
            value: Number(reading.valeur),
            time: new Date(reading.timestamp)
        })).filter(reading => Number.isFinite(reading.value) && !Number.isNaN(reading.time.getTime()));

        setApiStatus(true);
    } catch (error) {
        machines = [];
        variables = [];
        readings = [];
        setApiStatus(false);
        if (showError) notify(`Connexion au backend impossible : ${error.message}`);
    }

    populateMachineFilter();
    renderSettings();
    renderDashboard();
}


// ==========================================
// 7. FONCTIONS UTILITAIRES
// ==========================================

function machineName(id) {
    return machines.find(m => m.id === id)?.name || t("unknownMachine");
}

function variableName(id) {
    return variables.find(v => v.id === id)?.name || t("variableFallback");
}

function fmtDate(d) {
    const locales = {
        fr: "fr-FR",
        en: "en-GB",
        zh: "zh-CN",
        es: "es-ES"
    };

    return new Intl.DateTimeFormat(locales[currentLanguage] || "fr-FR", {
        day: "2-digit",
        month: "2-digit",
        hour: "2-digit",
        minute: "2-digit"
    }).format(d);
}

function notify(msg) {
    document.getElementById("toastText").textContent = msg;

    const toast = document.getElementById("toast");
    toast.classList.add("show");

    setTimeout(() => toast.classList.remove("show"), 2400);
}


// ==========================================
// 8. NAVIGATION ENTRE LES PAGES
// ==========================================

function showPage(page) {
    currentPage = page;

    document.getElementById("dashboardPage")
        .classList.toggle("hidden", page !== "dashboard");

    document.getElementById("settingsPage")
        .classList.toggle("hidden", page !== "settings");

    document.getElementById("preferencesPage")
        .classList.toggle("hidden", page !== "preferences");

    document.querySelectorAll(".nav-link").forEach(link => {
        link.classList.toggle("active", link.dataset.page === page);
    });

    const breadcrumb = document.getElementById("breadcrumb");

    if (page === "dashboard") {
        breadcrumb.textContent = t("dashboard");
        renderDashboard();
    } else if (page === "settings") {
        breadcrumb.textContent = t("configuration");
        renderSettings();
    } else if (page === "preferences") {
        breadcrumb.textContent = t("preferences");
    }
}

document.querySelectorAll(".nav-link").forEach(link => {
    link.addEventListener("click", () => showPage(link.dataset.page));
});


// ==========================================
// 9. FILTRES AUTOMATES ET VARIABLES
// ==========================================

function populateMachineFilter() {
    const select = document.getElementById("machineFilter");
    const previousValue = select.value || "all";

    select.innerHTML =
        `<option value="all">${t("allMachines")}</option>` +
        machines.map(m =>
            `<option value="${m.id}">${escapeHtml(m.name)}</option>`
        ).join("");

    select.value = machines.some(m => String(m.id) === previousValue)
        ? previousValue
        : "all";

    updateVariableOptions();
}

function updateVariableOptions() {
    const machineId = document.getElementById("machineFilter").value;
    const select = document.getElementById("variableFilter");
    const previousValue = select.value;

    select.innerHTML =
        `<option value="all">${t("allVariables")}</option>` +
        variables
            .filter(v => machineId === "all" || v.machineId == machineId)
            .map(v => `<option value="${v.id}">${escapeHtml(v.name)}</option>`)
            .join("");

    select.value = [...select.options].some(o => o.value === previousValue)
        ? previousValue
        : "all";
}

function selectedReadings() {
    const machineId = document.getElementById("machineFilter").value;
    const variableId = document.getElementById("variableFilter").value;
    const days = +document.getElementById("periodFilter").value;

    const cutoff = Date.now() - days * 86400000;

    return readings.filter(r =>
        (machineId === "all" || r.machineId == machineId) &&
        (variableId === "all" || r.variableId == variableId) &&
        r.time.getTime() >= cutoff
    );
}


// ==========================================
// 10. DASHBOARD ET KPI
// ==========================================

function renderDashboard() {
    const rows = selectedReadings().sort((a, b) => a.time - b.time);

    const selectedMachine = document.getElementById("machineFilter").value;
    const selectedVariable = document.getElementById("variableFilter").value;

    const activeVars = variables.filter(v =>
        v.active &&
        (selectedMachine === "all" || v.machineId == selectedMachine) &&
        (selectedVariable === "all" || v.id == selectedVariable)
    );

    const primary = activeVars[0] || variables[0];
    let primaryRows = rows.filter(r => r.variableId === primary?.id);

    if (!primaryRows.length) primaryRows = rows;

    const vals = primaryRows.map(r => r.value);

    const avg = vals.length
        ? vals.reduce((a, b) => a + b, 0) / vals.length
        : 0;

    const unit = primary?.unit || "";

    document.getElementById("kpiLast").innerHTML =
        `${vals.at(-1) ?? "—"} <small>${escapeHtml(unit)}</small>`;

    document.getElementById("kpiAvg").innerHTML =
        `${vals.length ? avg.toFixed(1) : "—"} <small>${escapeHtml(unit)}</small>`;

    document.getElementById("kpiMin").innerHTML =
        `${vals.length ? Math.min(...vals).toFixed(1) : "—"} <small>${escapeHtml(unit)}</small>`;

    document.getElementById("kpiMax").innerHTML =
        `${vals.length ? Math.max(...vals).toFixed(1) : "—"} <small>${escapeHtml(unit)}</small>`;


    // ======================================
    // GRAPHIQUE CHART.JS
    // ======================================

    const ctx = document.getElementById("processChart");

    if (chart) chart.destroy();

    const colors = currentTheme === "kawaii" ? [
        "#e879a7",
        "#b67bd1",
        "#f2a7bd",
        "#8dbfa9",
        "#e5a84e"
    ] : [
        "#27c5df",
        "#35d39a",
        "#f4b65f",
        "#a78bfa",
        "#ff7882"
    ];

    const chartBuckets = [...new Set(rows.map(r => Math.floor(r.time.getTime() / 5000) * 5000))]
        .sort((a, b) => a - b);

    const datasets = activeVars.map((v, i) => {
        const valuesByBucket = new Map();
        rows.filter(r => r.variableId === v.id).forEach(reading => {
            const bucket = Math.floor(reading.time.getTime() / 5000) * 5000;
            valuesByBucket.set(bucket, reading.value);
        });

        return {
            label: `${v.name} (${v.unit})`,
            data: chartBuckets.map(bucket => valuesByBucket.get(bucket) ?? null),
            borderColor: colors[i % colors.length],
            backgroundColor: colors[i % colors.length],
            borderWidth: 2,
            pointRadius: 0,
            tension: 0.35
        };
    });

    const styles = getComputedStyle(document.documentElement);
    const textColor = styles.getPropertyValue("--chart-text").trim();
    const gridColor = styles.getPropertyValue("--grid").trim();

    chart = new Chart(ctx, {
        type: "line",

        data: {
            labels: chartBuckets.map(bucket => fmtDate(new Date(bucket))),
            datasets: datasets
        },

        options: {
            responsive: true,
            maintainAspectRatio: false,

            interaction: {
                mode: "index",
                intersect: false
            },

            plugins: {
                legend: {
                    labels: {
                        color: textColor,
                        usePointStyle: true,
                        boxWidth: 7,
                        font: { size: 10 }
                    }
                },

                tooltip: {
                    backgroundColor: currentTheme === "dark"
                        ? "#0b1926"
                        : currentTheme === "kawaii" ? "#fff0f6" : "#ffffff",
                    borderColor: currentTheme === "dark"
                        ? "#355064"
                        : currentTheme === "kawaii" ? "#edb1ca" : "#d5e0e9",
                    borderWidth: 1,
                    titleColor: currentTheme === "dark" ? "#fff" : "#542f43",
                    bodyColor: currentTheme === "dark" ? "#cbd8e2" : "#654357"
                }
            },

            scales: {
                x: {
                    ticks: {
                        color: textColor,
                        maxTicksLimit: 8,
                        font: { size: 10 }
                    },
                    grid: { color: gridColor }
                },

                y: {
                    ticks: {
                        color: textColor,
                        font: { size: 10 }
                    },
                    grid: { color: gridColor }
                }
            }
        }
    });


    // ======================================
    // TABLEAU DES DERNIERS RELEVES
    // ======================================

    const body = document.getElementById("readingsBody");

    const latest = rows
        .slice()
        .sort((a, b) => b.time - a.time)
        .slice(0, 12);

    body.innerHTML = latest.length
        ? latest.map(r => {
            const v = variables.find(x => x.id === r.variableId);

            return `
                <tr>
                    <td>${fmtDate(r.time)}</td>
                    <td>${escapeHtml(machineName(r.machineId))}</td>
                    <td>${escapeHtml(v?.name || "—")}</td>
                    <td><strong>${r.value.toFixed(1)}</strong></td>
                    <td>${escapeHtml(v?.unit || "—")}</td>
                    <td>
                        <span class="status ${v?.active ? "ok" : "warn"}">
                            ${v?.active ? t("normal") : t("inactive")}
                        </span>
                    </td>
                </tr>
            `;
        }).join("")
        : `<tr><td colspan="6" class="empty">${t("noReadings")}</td></tr>`;
}


// ==========================================
// 11. REINITIALISATION DES FILTRES
// ==========================================

function resetFilters() {
    document.getElementById("machineFilter").value = "all";
    document.getElementById("periodFilter").value = "1";

    updateVariableOptions();

    document.getElementById("variableFilter").value = "all";

    renderDashboard();
}


// ==========================================
// 12. EXPORT CSV
// ==========================================

function exportCSV() {
    const rows = selectedReadings().sort((a, b) => a.time - b.time);

    const lines = [
        [
            t("timestamp"),
            t("machine"),
            t("variable"),
            t("value"),
            t("unit")
        ],

        ...rows.map(r => {
            const v = variables.find(x => x.id === r.variableId);

            return [
                r.time.toISOString(),
                machineName(r.machineId),
                v?.name || "",
                r.value,
                v?.unit || ""
            ];
        })
    ];

    const csv = "\uFEFF" + lines.map(row =>
        row.map(x =>
            '"' + String(x).replaceAll('"', '""') + '"'
        ).join(";")
    ).join("\n");

    const blob = new Blob([csv], {
        type: "text/csv;charset=utf-8;"
    });

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");

    a.href = url;
    a.download = "releves_process.csv";
    a.click();

    URL.revokeObjectURL(url);

    notify(t("csvDownloaded"));
}


// ==========================================
// 13. EXPORT GRAPHIQUE PNG
// ==========================================

function exportChart() {
    if (!chart) return;

    const a = document.createElement("a");

    a.href = chart.toBase64Image();
    a.download = "evolution_process.png";

    a.click();

    notify(t("chartExported"));
}


// ==========================================
// 14. AFFICHAGE DU PARAMETRAGE
// ==========================================

function renderSettings() {
    document.getElementById("machineCount").textContent =
        `${machines.length} ${t("equipment")}`;

    // Liste des automates
    document.getElementById("machineList").innerHTML =
        machines.length
            ? machines.map(m => `
                <div class="d-flex justify-content-between align-items-center py-3"
                     style="border-bottom:1px solid var(--line)">

                    <div class="d-flex gap-3 align-items-center">
                        <div class="brand-mark" style="width:34px;height:34px;font-size:15px">
                            <i class="bi bi-cpu"></i>
                        </div>

                        <div>
                            <div class="fw-semibold">${escapeHtml(m.name)}</div>
                            <div class="panel-sub">
                                <i class="bi bi-hdd-network me-1"></i>${escapeHtml(m.ip)} · ${escapeHtml(m.protocol)}
                            </div>
                        </div>
                    </div>

                    <div class="d-flex gap-2">
                        <button class="btn-outline" onclick="openMachineModal(${m.id})">
                            <i class="bi bi-pencil"></i>
                        </button>

                        <button class="btn-outline" onclick="deleteMachine(${m.id})">
                            <i class="bi bi-trash"></i>
                        </button>
                    </div>
                </div>
            `).join("")
            : `<div class="empty">${t("noMachine")}</div>`;


    // Liste des variables
    document.getElementById("configVariables").innerHTML =
        variables.length
            ? variables.map(v => `
                <tr>
                    <td>
                        <strong>${escapeHtml(v.name)}</strong>
                        <div class="panel-sub">${escapeHtml(v.type)} · ${escapeHtml(v.unit)}</div>
                    </td>

                    <td>${escapeHtml(machineName(v.machineId))}</td>

                    <td><span class="tag">${escapeHtml(v.register)}</span></td>

                    <td>${v.frequency} ${t("second")}</td>

                    <td>
                        <span class="status ${v.active ? "ok" : "warn"}">
                            ${v.active ? t("active") : t("inactive")}
                        </span>
                    </td>

                    <td>
                        <div class="d-flex gap-1">
                            <button class="btn-outline" onclick="openVariableModal(${v.id})">
                                <i class="bi bi-pencil"></i>
                            </button>

                            <button class="btn-outline" onclick="deleteVariable(${v.id})">
                                <i class="bi bi-trash"></i>
                            </button>
                        </div>
                    </td>
                </tr>
            `).join("")
            : `<tr><td colspan="6" class="empty">${t("noVariable")}</td></tr>`;
}


// ==========================================
// 15. GESTION DES AUTOMATES
// ==========================================

function openMachineModal(id) {
    const machine = machines.find(x => x.id === id);

    document.getElementById("machineEditId").value = machine?.id || "";
    document.getElementById("machineName").value = machine?.name || "";
    document.getElementById("machineIP").value = machine?.ip || "";
    document.getElementById("machineProtocol").value = machine?.protocol || "Modbus TCP";

    document.getElementById("machineModalTitle").textContent =
        machine ? t("editMachineTitle") : t("addMachineTitle");

    machineModal().show();
}

async function saveMachine() {
    const id = +document.getElementById("machineEditId").value;

    const name = document.getElementById("machineName").value.trim();
    const ip = document.getElementById("machineIP").value.trim();
    const protocol = document.getElementById("machineProtocol").value;

    if (!name || !ip) {
        notify(t("completeFields"));
        return;
    }

    try {
        const payload = { nom: name, protocol, ip_address: ip };
        await apiRequest(id ? `/machines/${id}` : "/machines", {
            method: id ? "PATCH" : "POST",
            body: JSON.stringify(payload)
        });
        machineModal().hide();
        await loadBackendData(false);
        notify(t("machineSaved"));
    } catch (error) {
        notify(`Enregistrement impossible : ${error.message}`);
    }
}

async function deleteMachine(id) {
    if (!confirm(t("machineDeleteConfirm"))) return;

    try {
        await apiRequest(`/machines/${id}`, { method: "DELETE" });
        await loadBackendData(false);
        notify(t("machineDeleted"));
    } catch (error) {
        notify(`Suppression impossible : ${error.message}`);
    }
}


// ==========================================
// 16. GESTION DES VARIABLES
// ==========================================

function openVariableModal(id) {
    if (!machines.length) {
        notify(t("addMachineFirst"));
        return;
    }

    const variable = variables.find(x => x.id === id);

    document.getElementById("variableEditId").value = variable?.id || "";
    document.getElementById("variableName").value = variable?.name || "";

    document.getElementById("variableMachine").innerHTML =
        machines.map(m =>
            `<option value="${m.id}">${escapeHtml(m.name)}</option>`
        ).join("");

    document.getElementById("variableMachine").value =
        variable?.machineId || machines[0].id;

    document.getElementById("variableRegister").value =
        variable?.register || "";

    document.getElementById("variableUnit").value =
        variable?.unit || "";

    document.getElementById("variableType").value =
        variable?.type || "Float";

    document.getElementById("variableFrequency").value =
        variable?.frequency || 5;

    document.getElementById("variableModalTitle").textContent =
        variable ? t("editVariableTitle") : t("addVariableTitle");

    variableModal().show();
}

async function saveVariable() {
    const id = +document.getElementById("variableEditId").value;

    const name = document.getElementById("variableName").value.trim();
    const machineId = +document.getElementById("variableMachine").value;
    const register = document.getElementById("variableRegister").value.trim();
    const unit = document.getElementById("variableUnit").value.trim();
    const type = document.getElementById("variableType").value;

    const frequency = Math.max(
        1,
        +document.getElementById("variableFrequency").value || 1
    );

    if (!name || !register || !machineId) {
        notify(t("completeFields"));
        return;
    }

    try {
        const payload = {
            machine_id: machineId,
            nom: name,
            type_var: type,
            adresse_memoire: register,
            unite: unit || null,
            frequence_acquisition: frequency
        };
        await apiRequest(id ? `/variables/${id}` : "/variables", {
            method: id ? "PATCH" : "POST",
            body: JSON.stringify(payload)
        });
        variableModal().hide();
        await loadBackendData(false);
        notify(t("variableSaved"));
    } catch (error) {
        notify(`Enregistrement impossible : ${error.message}`);
    }
}


// ==========================================
// 17. SUPPRESSION DES VARIABLES
// ==========================================

async function deleteVariable(id) {
    if (!confirm(t("variableDeleteConfirm"))) return;

    try {
        await apiRequest(`/variables/${id}`, { method: "DELETE" });
        await loadBackendData(false);
        notify(t("variableDeleted"));
    } catch (error) {
        notify(`Suppression impossible : ${error.message}`);
    }
}


// ==========================================
// 18. INITIALISATION DE L'APPLICATION
// ==========================================

initializePreferences();
loadBackendData();
setInterval(() => loadBackendData(false), 15000);